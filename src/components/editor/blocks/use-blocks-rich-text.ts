import { useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useEditorStore } from '../store/editor-store';
import type { ContentBlocks } from '../schemas/content/content-blocks.schema';

type TypographySelection = {
  range: Range;
  blockId: string;
  blockAttributeKey: string;
  blockAttributeListItemId?: string;
};

const richTextTypes = {
  bold: {
    tagName: 'strong',
  },
  italic: {
    tagName: 'i',
  },
  link: {
    tagName: 'a',
  },
  underline: {
    tagName: 'u',
  },
  strikethrough: {
    tagName: 's',
  },
} as const;

type RichTextType = keyof typeof richTextTypes;

type RichTextTagName = (typeof richTextTypes)[keyof typeof richTextTypes]['tagName'];

/*
**** Structure of rich text functionality ****

useBlocksRichText
    │
    ├── setRichTextSelection
    ├── handleContentBlockRichText
    │       │
    │       ├── applyRichTextTypeToRange
    │       │
    │       ├── applyRichTextTypeToMixedRange
    │       │       ├── applyRichTextTypeToAdjacentMixedRange
    │       │       └── applyRichTextTypeToMultipleRichTextRange
    │       │
    │       └── removeRichTextTypeFromRange
    │               ├── removeRichTextTypeFromDirectTextNode
    │               ├── removeRichTextTypeFromMultiNodeRange
    │               └── removeRichTextTypeFromMultipleRichTextRange
    └── handleContentBlockRichTextSelect
  
*/

export default function useBlocksRichText() {
  const typographySelectionRef = useRef<TypographySelection | null>(null);

  const {
    contentBlockRichTextActive,
    setContentBlockRichTextActive,
    setContentBlockCaretRichTextActive,
    setContentBlockRichTextLinkActive,
    setContentBlockRichTextLinkURL,
    updateContentBlockAttribute,
    updateListBlockItemContent,
  } = useEditorStore(
    useShallow((state) => ({
      contentBlockRichTextActive: state.contentBlockRichTextActive,
      setContentBlockRichTextActive: state.setContentBlockRichTextActive,
      setContentBlockCaretRichTextActive: state.setContentBlockCaretRichTextActive,
      setContentBlockRichTextLinkActive: state.setContentBlockRichTextLinkActive,
      setContentBlockRichTextLinkURL: state.setContentBlockRichTextLinkURL,
      updateContentBlockAttribute: state.updateContentBlockAttribute,
      updateListBlockItemContent: state.updateListBlockItemContent,
    })),
  );

  // ******** GENERAL RICH TEXT HELPER FUNCTIONS ********

  const getBlockAttributeElement = ({
    blockId,
    blockAttributeKey,
    blockAttributeListItemId,
  }: {
    blockId: string;
    blockAttributeKey: string;
    blockAttributeListItemId?: string;
  }) => {
    const blockElement = document.querySelector(`[data-block-id="${blockId}"]`);

    if (!blockElement) return null;

    if (!blockAttributeListItemId) {
      return blockElement.querySelector(`[data-block-attribute-key="${blockAttributeKey}"]`);
    } else {
      return blockElement.querySelector(
        `[data-block-list-item-id="${blockAttributeListItemId}"][data-block-attribute-key="${blockAttributeKey}"]`,
      );
    }
  };

  const getSelectedText = (node: Text, range: Range) => {
    const text = node.textContent ?? '';

    let start = 0;
    let end = text.length;

    if (range.startContainer === node) {
      start = range.startOffset;
    }

    if (range.endContainer === node) {
      end = range.endOffset;
    }

    return text.slice(start, end);
  };

  const getSelectedTextParts = (node: Text, range: Range) => {
    const text = node.textContent ?? '';

    let start = 0;
    let end = text.length;

    if (range.startContainer === node) {
      start = range.startOffset;
    }

    if (range.endContainer === node) {
      end = range.endOffset;
    }

    return {
      before: text.slice(0, start),
      selectedText: text.slice(start, end),
      after: text.slice(end),
    };
  };

  const getTextNodesInRange = (range: Range, root: Element): Text[] => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);

    const nodes: Text[] = [];

    let node = walker.nextNode();

    while (node) {
      const textNode = node as Text;

      if (range.intersectsNode(textNode)) {
        nodes.push(textNode);
      }

      node = walker.nextNode();
    }

    return nodes;
  };

  const isNodeRichTextType = ({ type, node }: { type: RichTextType; node: Text }): boolean => {
    return node.parentElement?.closest(richTextTypes[type]?.tagName) !== null;
  };

  const hasOtherRichTextType = ({ type, textNodes }: { type: RichTextType; textNodes: Text[] }): boolean => {
    return textNodes.some((node) => {
      return Object.entries(richTextTypes).some(([richTextType, { tagName }]) => {
        if (richTextType === type) return false;

        return node.parentElement?.closest(tagName) !== null;
      });
    });
  };

  // ******** APPLYING RICH TEXT ********

  const applyRichTextTypeToRange = ({
    type,
    range,
    attributeElement,
    linkURL,
  }: {
    type: RichTextType;
    range: Range;
    attributeElement: Element;
    linkURL?: string;
  }) => {
    if (!type || !range || !attributeElement) return;

    const richTextTypeTagName = richTextTypes[type]?.tagName;

    const selectedContents = range.extractContents();

    const newRichTextElement = document.createElement(richTextTypeTagName);

    if (type === 'link') newRichTextElement.setAttribute('href', linkURL ?? '');

    newRichTextElement.appendChild(selectedContents);

    range.insertNode(newRichTextElement);

    return attributeElement.innerHTML;
  };

  const applyRichTextTypeToMixedRange = ({
    type,
    range,
    textNodes,
    attributeElement,
    linkURL,
  }: {
    type: RichTextType;
    range: Range;
    textNodes: Text[];
    attributeElement: Element;
    linkURL?: string;
  }) => {
    if (!type || !range || !textNodes || !attributeElement) return;

    const unformattedTextNodes = textNodes.filter((node) => !isNodeRichTextType({ type, node }));

    const richTextElements = [
      ...new Set(
        textNodes
          .map((node) => node.parentElement?.closest(richTextTypes[type].tagName))
          .filter((element): element is HTMLElement => element !== null),
      ),
    ];

    if (unformattedTextNodes.length === 1 && richTextElements.length === 1) {
      // one unformatted text node - left/right expansion of rich text tag
      // for example: This <strong>is some</strong> text
      // to: <strong>This is some</strong> text
      // or: This <strong>is some text</strong>
      return applyRichTextTypeToAdjacentMixedRange({
        type,
        range,
        textNodes,
        attributeElement,
        unformattedTextNodes,
        linkURL,
      });
    }

    // multiple unformatted/formatted portions
    return applyRichTextTypeToMultipleRichTextRange({
      type,
      range,
      textNodes,
      attributeElement,
      linkURL,
    });
  };

  const applyRichTextTypeToAdjacentMixedRange = ({
    type,
    range,
    textNodes,
    attributeElement,
    unformattedTextNodes,
    linkURL,
  }: {
    type: RichTextType;
    range: Range;
    textNodes: Text[];
    attributeElement: Element;
    unformattedTextNodes: Text[];
    linkURL?: string;
  }) => {
    if (!type || !range || !textNodes || !attributeElement) return;

    const unformattedNode = unformattedTextNodes[0];

    const previousSibling = unformattedNode.previousSibling;

    const nextSibling = unformattedNode.nextSibling;

    const { before, selectedText, after } = getSelectedTextParts(unformattedNode, range);

    if (!selectedText) return;

    const richTextTypeTagName = richTextTypes[type].tagName;

    const previousRichText =
      previousSibling instanceof HTMLElement && previousSibling.matches(richTextTypeTagName) ? previousSibling : null;

    const nextRichText =
      nextSibling instanceof HTMLElement && nextSibling.matches(richTextTypeTagName) ? nextSibling : null;

    const rangeStartsInPreviousRichText = previousRichText !== null && previousRichText.contains(range.startContainer);

    const rangeEndsInNextRichText = nextRichText !== null && nextRichText.contains(range.endContainer);

    const rangeStartsInUnformatted = range.startContainer === unformattedNode;

    const rangeEndsInUnformatted = range.endContainer === unformattedNode;

    if (previousRichText && rangeStartsInPreviousRichText && rangeEndsInUnformatted) {
      const lastChild = previousRichText.lastChild;

      if (lastChild instanceof Text) {
        lastChild.textContent += selectedText;
      } else {
        previousRichText.appendChild(document.createTextNode(selectedText));
      }

      if (type === 'link') {
        previousRichText.setAttribute('href', linkURL ?? '');
      }
    } else if (nextRichText && rangeStartsInUnformatted && rangeEndsInNextRichText) {
      const firstChild = nextRichText.firstChild;

      if (firstChild instanceof Text) {
        firstChild.textContent = selectedText + firstChild.textContent;
      } else {
        nextRichText.prepend(document.createTextNode(selectedText));
      }

      if (type === 'link') {
        nextRichText.setAttribute('href', linkURL ?? '');
      }
    } else {
      return;
    }

    const fragment = document.createDocumentFragment();

    if (before) {
      fragment.appendChild(document.createTextNode(before));
    }

    if (after) {
      fragment.appendChild(document.createTextNode(after));
    }

    unformattedNode.replaceWith(fragment);

    return attributeElement.innerHTML;
  };

  const applyRichTextTypeToMultipleRichTextRange = ({
    type,
    range,
    textNodes,
    attributeElement,
    linkURL,
  }: {
    type: RichTextType;
    range: Range;
    textNodes: Text[];
    attributeElement: Element;
    linkURL?: string;
  }) => {
    if (!type || !range || !textNodes || !attributeElement) return;

    const richTextTypeTagName = richTextTypes[type].tagName;

    const selectedContents = range.extractContents();

    unwrapRichTextElements({
      root: selectedContents,
      tagName: richTextTypeTagName,
    });

    const newRichTextElement = document.createElement(richTextTypeTagName);

    if (type === 'link') newRichTextElement.setAttribute('href', linkURL ?? '');

    newRichTextElement.appendChild(selectedContents);

    range.insertNode(newRichTextElement);

    mergeAdjacentRichTextElements({
      element: newRichTextElement,
      tagName: richTextTypeTagName,
    });

    removeEmptyFormattingElements({
      root: attributeElement,
    });

    return attributeElement.innerHTML;
  };

  // ******** APPLYING RICH TEXT HELPER FUNCTIONS ********

  const removeEmptyFormattingElements = ({ root }: { root: Element }) => {
    const formattingTags = Object.values(richTextTypes).map(({ tagName }) => tagName);

    root.querySelectorAll(formattingTags.join(',')).forEach((element) => {
      if (element.textContent === '') {
        element.remove();
      }
    });
  };

  const unwrapRichTextElements = ({ root, tagName }: { root: DocumentFragment; tagName: string }) => {
    const elements = Array.from(root.querySelectorAll(tagName));

    elements.forEach((element) => {
      element.replaceWith(...Array.from(element.childNodes));
    });

    root.normalize();
  };

  const mergeAdjacentRichTextElements = ({ element, tagName }: { element: Element; tagName: string }) => {
    let current = element.previousSibling;

    if (current instanceof HTMLElement && current.matches(tagName)) {
      while (element.firstChild) {
        current.appendChild(element.firstChild);
      }

      element.remove();
      element = current;
    }

    current = element.nextSibling;

    if (current instanceof HTMLElement && current.matches(tagName)) {
      while (current.firstChild) {
        element.appendChild(current.firstChild);
      }

      current.remove();
    }
  };

  // ******** APPLYING RICH TEXT TO COLLAPSED RANGE ********

  /*

  Click formatting button
          ↓
  contentBlockRichTextActive updated
          ↓
  Type character
          ↓
  handleBlockContentInput
          ↓
  active types?
    ↙          ↘
  yes           no
  ↓              ↓
  apply active    move inserted text
  formatting      outside formatting
          ↓
  restore caret

  */

  const applyActiveRichTextToInsertedText = ({
    range,
    insertedText,
    activeRichText,
  }: {
    range: Range;
    insertedText: string;
    activeRichText: RichTextType[];
  }) => {
    if (!range.collapsed || !(range.startContainer instanceof Text)) return;

    if (!insertedText || !activeRichText.length) return;

    const textNode = range.startContainer;

    const endOffset = range.startOffset;
    const startOffset = endOffset - insertedText.length;

    if (startOffset < 0) return;

    const insertedRange = document.createRange();

    insertedRange.setStart(textNode, startOffset);
    insertedRange.setEnd(textNode, endOffset);

    const missingRichTextTypes = activeRichText.filter((type) => {
      const tagName = richTextTypes[type].tagName;

      return textNode.parentElement?.closest(tagName) === null;
    });

    const existingRichText = getRichTextTypesAtTextNode({ textNode });
    const inactiveRichTextTypes = existingRichText.filter((type) => !activeRichText.includes(type));

    if (inactiveRichTextTypes.length) {
      removeInactiveRichTextTypesFromInsertedText({
        range,
        insertedText,
        inactiveRichTextTypes,
      });

      return;
    }

    // The browser has already inserted the text inside all of the
    // required formatting elements, so there is nothing to do.
    if (!missingRichTextTypes.length) return;

    const selectedContents = insertedRange.extractContents();

    const richTextElement = createActiveRichTextElement({
      types: missingRichTextTypes,
      content: selectedContents,
    });

    insertedRange.insertNode(richTextElement);

    // Find the deepest text node inside the newly-created
    // formatting structure so the caret can be placed after
    // the inserted text.
    const insertedTextNode = getLastTextNode(richTextElement);

    if (!insertedTextNode) return;

    const caretRange = document.createRange();

    caretRange.setStart(insertedTextNode, insertedTextNode.length);
    caretRange.collapse(true);

    const selection = window.getSelection();

    if (selection) {
      selection.removeAllRanges();
      selection.addRange(caretRange);
    }
  };

  const createActiveRichTextElement = ({ types, content }: { types: RichTextType[]; content: Node }) => {
    let node = content;

    for (const type of [...types].reverse()) {
      const element = document.createElement(richTextTypes[type].tagName);

      element.appendChild(node);
      node = element;
    }

    return node;
  };

  const getLastTextNode = (node: Node): Text | null => {
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);

    let lastTextNode: Text | null = null;

    while (walker.nextNode()) {
      lastTextNode = walker.currentNode as Text;
    }

    return lastTextNode;
  };

  const getRichTextTypesAtCaret = ({ range }: { range: Range }): RichTextType[] => {
    if (!range.collapsed) return [];

    const container = range.startContainer;

    if (!(container instanceof Text)) return [];

    const parent = container.parentElement;

    if (!parent) return [];

    const activeRichText = getRichTextTypesContainingElement({
      element: parent,
    });

    return activeRichText.filter((type) => {
      const tagName = richTextTypes[type].tagName;

      const richTextElement = parent.closest(tagName);

      if (!richTextElement) return false;

      if (
        isCaretAtEndOfRichTextElement({
          range,
          element: richTextElement,
        })
      ) {
        return false;
      }

      return true;
    });
  };

  const getRichTextTypesContainingElement = ({ element }: { element: Element }): RichTextType[] => {
    return Object.entries(richTextTypes)
      .filter(([, config]) => {
        return element.closest(config.tagName) !== null;
      })
      .map(([type]) => type as RichTextType);
  };

  const isCaretAtEndOfRichTextElement = ({ range, element }: { range: Range; element: Element }) => {
    const container = range.startContainer;

    if (!(container instanceof Text)) return false;

    if (range.startOffset !== container.length) return false;

    let currentNode: Node = container;

    while (currentNode !== element) {
      if (currentNode.nextSibling) {
        return false;
      }

      if (currentNode.parentNode) currentNode = currentNode.parentNode;

      if (!currentNode) {
        return false;
      }
    }

    return true;
  };

  const removeActiveRichTextFromInsertedText = ({ range, insertedText }: { range: Range; insertedText: string }) => {
    if (!range.collapsed || !(range.startContainer instanceof Text)) return;

    moveInsertedTextOutsideRichTextElement({
      textNode: range.startContainer,
      insertedText,
      range,
    });
  };

  const moveInsertedTextOutsideRichTextElement = ({
    textNode,
    insertedText,
    range,
  }: {
    textNode: Text;
    insertedText: string;
    range: Range;
  }) => {
    const richTextElements = getRichTextElementsContainingTextNode({
      textNode,
    });

    if (!richTextElements.length) return;

    const richTextElement = richTextElements.at(-1);

    if (!richTextElement) return;

    const endOffset = range.startOffset;
    const startOffset = endOffset - insertedText.length;

    if (startOffset < 0) return;

    /*
     * Select everything before the inserted text, starting from
     * the beginning of the outer rich-text element.
     */
    const beforeRange = document.createRange();

    beforeRange.selectNodeContents(richTextElement);
    beforeRange.setEnd(textNode, startOffset);

    /*
     * Select the text inserted by the browser.
     */
    const insertedRange = document.createRange();

    insertedRange.setStart(textNode, startOffset);
    insertedRange.setEnd(textNode, endOffset);

    /*
     * Select everything after the inserted text, up to the end
     * of the outer rich-text element.
     */
    const afterRange = document.createRange();

    afterRange.selectNodeContents(richTextElement);
    afterRange.setStart(textNode, endOffset);

    const beforeContents = beforeRange.cloneContents();
    const insertedContents = insertedRange.cloneContents();
    const afterContents = afterRange.cloneContents();

    const parent = richTextElement.parentNode;

    if (!parent) return;

    /*
     * Keep a reference to the actual inserted text node so we can
     * restore the caret after replacing the formatting element.
     */
    const insertedTextNode = getLastTextNode(insertedContents);

    if (!insertedTextNode) return;

    const fragment = document.createDocumentFragment();

    /*
     * The cloned contents already contain any nested formatting.
     * We only need to recreate the outer formatting element.
     */
    if (beforeContents.hasChildNodes()) {
      const beforeElement = richTextElement.cloneNode(false) as HTMLElement;

      beforeElement.appendChild(beforeContents);
      fragment.appendChild(beforeElement);
    }

    /*
     * The inserted text deliberately remains outside all
     * rich-text formatting.
     */
    if (insertedContents.hasChildNodes()) {
      fragment.appendChild(insertedContents);
    }

    /*
     * Again, the cloned contents already contain their nested
     * formatting, so only recreate the outer element.
     */
    if (afterContents.hasChildNodes()) {
      const afterElement = richTextElement.cloneNode(false) as HTMLElement;

      afterElement.appendChild(afterContents);
      fragment.appendChild(afterElement);
    }

    richTextElement.replaceWith(fragment);

    removeEmptyFormattingElements({
      root: richTextElement.parentElement ?? document.body,
    });

    /*
     * The original DOM node containing the caret was replaced,
     * so explicitly restore the caret after the inserted text.
     */
    const caretRange = document.createRange();

    caretRange.setStart(insertedTextNode, insertedTextNode.length);
    caretRange.collapse(true);

    const selection = window.getSelection();

    if (selection) {
      selection.removeAllRanges();
      selection.addRange(caretRange);
    }
  };

  const getRichTextElementsContainingTextNode = ({ textNode }: { textNode: Text }) => {
    const tagNames = Object.values(richTextTypes).map(({ tagName }) => tagName);

    const elements: HTMLElement[] = [];

    let element = textNode.parentElement;

    while (element) {
      const elementTagName = element.tagName.toLowerCase() as RichTextTagName;

      if (tagNames.includes(elementTagName)) {
        elements.push(element);
      }

      element = element.parentElement;
    }

    return elements;
  };

  const moveCaretAfterRichTextElement = ({ element }: { element: Element }) => {
    const parent = element.parentNode;

    if (!parent) return;

    const range = document.createRange();

    range.setStartAfter(element);
    range.collapse(true);

    const selection = window.getSelection();

    if (!selection) return;

    selection.removeAllRanges();
    selection.addRange(range);
  };

  const getRichTextTypesAtTextNode = ({ textNode }: { textNode: Text }): RichTextType[] => {
    return (Object.keys(richTextTypes) as RichTextType[]).filter((type) => {
      const tagName = richTextTypes[type].tagName;

      return textNode.parentElement?.closest(tagName) !== null;
    });
  };

  const removeInactiveRichTextTypesFromInsertedText = ({
    range,
    insertedText,
    inactiveRichTextTypes,
  }: {
    range: Range;
    insertedText: string;
    inactiveRichTextTypes: RichTextType[];
  }) => {
    if (!range.collapsed || !(range.startContainer instanceof Text) || !insertedText || !inactiveRichTextTypes.length) {
      return;
    }

    const textNode = range.startContainer;

    const endOffset = range.startOffset;
    const startOffset = endOffset - insertedText.length;

    if (startOffset < 0) return;

    for (const type of inactiveRichTextTypes) {
      const tagName = richTextTypes[type].tagName;

      const inactiveElement = textNode.parentElement?.closest(tagName);

      if (!(inactiveElement instanceof HTMLElement)) continue;

      /*
       * Content before the inserted text.
       *
       * cloneContents() already preserves any nested formatting,
       * so don't wrap this in another copy of the nested elements.
       */
      const beforeRange = document.createRange();

      beforeRange.selectNodeContents(inactiveElement);
      beforeRange.setEnd(textNode, startOffset);

      const beforeContents = beforeRange.cloneContents();

      /*
       * Content inserted by the browser.
       *
       * This needs to preserve nested formatting but exclude
       * the inactive formatting element itself.
       */
      const insertedRange = document.createRange();

      insertedRange.setStart(textNode, startOffset);
      insertedRange.setEnd(textNode, endOffset);

      const insertedContents = cloneNestedFormattingAroundRange({
        range: insertedRange,
        textNode,
        stopElement: inactiveElement,
      });

      /*
       * Content after the inserted text.
       */
      const afterRange = document.createRange();

      afterRange.selectNodeContents(inactiveElement);
      afterRange.setStart(textNode, endOffset);

      const afterContents = afterRange.cloneContents();

      const parent = inactiveElement.parentNode;

      if (!parent) continue;

      /*
       * Capture the inserted text node before the fragment is
       * inserted into the document.
       */
      const insertedTextNode = getLastTextNode(insertedContents);

      if (!insertedTextNode) continue;

      const fragment = document.createDocumentFragment();

      /*
       * Recreate the inactive element around the content before
       * the inserted text.
       */
      if (beforeContents.textContent !== '') {
        const beforeElement = inactiveElement.cloneNode(false) as HTMLElement;

        beforeElement.appendChild(beforeContents);
        fragment.appendChild(beforeElement);
      }

      /*
       * Inserted text keeps its other formatting but is outside
       * the inactive element.
       */
      if (insertedContents.textContent !== '') {
        fragment.appendChild(insertedContents);
      }

      /*
       * Recreate the inactive element around the content after
       * the inserted text.
       */
      if (afterContents.textContent !== '') {
        const afterElement = inactiveElement.cloneNode(false) as HTMLElement;

        afterElement.appendChild(afterContents);
        fragment.appendChild(afterElement);
      }

      inactiveElement.replaceWith(fragment);

      /*
       * Restore the caret immediately after the inserted text.
       */
      const caretRange = document.createRange();

      caretRange.setStart(insertedTextNode, insertedTextNode.length);
      caretRange.collapse(true);

      const selection = window.getSelection();

      if (selection) {
        selection.removeAllRanges();
        selection.addRange(caretRange);
      }
    }
  };

  // ******** REMOVING RICH TEXT ********

  const removeRichTextTypeFromRange = ({
    type,
    range,
    textNodes,
    attributeElement,
  }: {
    type: RichTextType;
    range: Range;
    textNodes: Text[];
    attributeElement: Element;
  }) => {
    if (!type || !range || !textNodes.length || !attributeElement) return;

    const richTextTypeTagName = richTextTypes[type].tagName;

    const richTextTypeElements = textNodes
      .map((node) => node.parentElement?.closest(richTextTypeTagName))
      .filter((element): element is HTMLElement => element !== null);

    const uniqueRichTextTypeElements = [...new Set(richTextTypeElements)];

    if (uniqueRichTextTypeElements.length === 0) {
      return;
    }

    // Selection spans multiple rich-text elements
    if (uniqueRichTextTypeElements.length > 1) {
      return removeRichTextTypeFromMultipleRichTextRange({
        type,
        range,
        attributeElement,
      });
    }

    const richTextTypeElement = uniqueRichTextTypeElements[0];

    // Selection spans multiple text nodes within one rich-text element
    if (textNodes.length > 1) {
      return removeRichTextTypeFromMultiNodeRange({
        type,
        richTextTypeElement,
        textNodes,
        range,
        attributeElement,
      });
    }

    // From here onwards we know there is only one text node
    const textNode = textNodes[0];

    // Entire formatting element selected
    if (
      rangeSelectsEntireTextNode({
        range,
        element: richTextTypeElement,
      })
    ) {
      richTextTypeElement.replaceWith(...richTextTypeElement.childNodes);

      return attributeElement.innerHTML;
    }

    const isDirectChild = textNode.parentElement === richTextTypeElement;

    if (isDirectChild) {
      return removeRichTextTypeFromDirectTextNode({
        element: richTextTypeElement,
        textNode,
        range,
        attributeElement,
      });
    }

    return removeRichTextTypeFromMultiNodeRange({
      type,
      richTextTypeElement,
      textNodes,
      range,
      attributeElement,
    });
  };

  const removeRichTextTypeFromDirectTextNode = ({
    element,
    textNode,
    range,
    attributeElement,
  }: {
    element: HTMLElement;
    textNode: Text;
    range: Range;
    attributeElement: Element;
  }) => {
    const start = range.startOffset;
    const end = range.endOffset;

    const beforeRange = document.createRange();
    beforeRange.selectNodeContents(element);
    beforeRange.setEnd(textNode, start);

    const selectedRange = document.createRange();
    selectedRange.setStart(textNode, start);
    selectedRange.setEnd(textNode, end);

    const afterRange = document.createRange();
    afterRange.selectNodeContents(element);
    afterRange.setStart(textNode, end);

    const beforeContents = beforeRange.cloneContents();
    const selectedContents = selectedRange.cloneContents();
    const afterContents = afterRange.cloneContents();

    const fragment = document.createDocumentFragment();

    if (beforeContents.textContent !== '') {
      const beforeElement = element.cloneNode(false) as HTMLElement;

      beforeElement.appendChild(beforeContents);

      fragment.appendChild(beforeElement);
    }

    if (selectedContents.textContent !== '') {
      fragment.appendChild(selectedContents);
    }

    if (afterContents.textContent !== '') {
      const afterElement = element.cloneNode(false) as HTMLElement;

      afterElement.appendChild(afterContents);

      fragment.appendChild(afterElement);
    }

    element.replaceWith(fragment);

    return attributeElement.innerHTML;
  };

  const removeRichTextTypeFromMultiNodeRange = ({
    type,
    richTextTypeElement,
    textNodes,
    range,
    attributeElement,
  }: {
    type: RichTextType;
    richTextTypeElement: HTMLElement;
    textNodes: Text[];
    range: Range;
    attributeElement: Element;
  }) => {
    if (!type || !range || !textNodes.length || !attributeElement) return;

    const beforeRange = document.createRange();

    beforeRange.selectNodeContents(richTextTypeElement);
    beforeRange.setEnd(range.startContainer, range.startOffset);

    const afterRange = document.createRange();

    afterRange.selectNodeContents(richTextTypeElement);
    afterRange.setStart(range.endContainer, range.endOffset);

    const beforeContents = beforeRange.cloneContents();

    const startTextNode =
      range.startContainer instanceof Text
        ? range.startContainer
        : textNodes.find((node) => node.contains(range.startContainer));

    const endTextNode =
      range.endContainer instanceof Text
        ? range.endContainer
        : textNodes.find((node) => node.contains(range.endContainer));

    if (!startTextNode || !endTextNode) return;

    const selectedContents = cloneNestedFormattingAroundRange({
      range,
      textNode: startTextNode,
      stopElement: richTextTypeElement,
    });

    const afterContents = afterRange.cloneContents();

    const fragment = document.createDocumentFragment();

    if (beforeContents.textContent !== '') {
      const beforeElement = richTextTypeElement.cloneNode(false) as HTMLElement;

      beforeElement.appendChild(beforeContents);

      fragment.appendChild(beforeElement);
    }

    if (selectedContents.textContent !== '') {
      fragment.appendChild(selectedContents);
    }

    if (afterContents.textContent !== '') {
      const afterElement = richTextTypeElement.cloneNode(false) as HTMLElement;

      afterElement.appendChild(afterContents);

      fragment.appendChild(afterElement);
    }

    // Remove empty nested elements created by cloneContents()
    removeEmptyNestedElements({
      root: fragment,
    });

    richTextTypeElement.replaceWith(fragment);

    return attributeElement.innerHTML;
  };

  const removeRichTextTypeFromMultipleRichTextRange = ({
    type,
    range,
    attributeElement,
  }: {
    type: RichTextType;
    range: Range;
    attributeElement: Element;
  }) => {
    if (!type || !range || !attributeElement) return;

    const richTextTypeTagName = richTextTypes[type].tagName;

    const selectedContents = range.extractContents();

    unwrapRichTextElements({
      root: selectedContents,
      tagName: richTextTypeTagName,
    });

    range.insertNode(selectedContents);

    removeEmptyNestedElements({
      root: attributeElement,
    });

    return attributeElement.innerHTML;
  };

  // ******** REMOVING RICH TEXT HELPER FUNCTIONS ********

  const rangeSelectsEntireTextNode = ({ range, element }: { range: Range; element: Element }) => {
    const textNode = range.startContainer;

    return (
      textNode instanceof Text &&
      textNode.parentElement === element &&
      range.endContainer === textNode &&
      range.startOffset === 0 &&
      range.endOffset === textNode.length
    );
  };

  const cloneNestedFormattingAroundRange = ({
    range,
    textNode,
    stopElement,
  }: {
    range: Range;
    textNode: Text;
    stopElement: HTMLElement;
  }) => {
    let currentElement = textNode.parentElement;

    if (!currentElement || currentElement === stopElement) {
      return range.cloneContents();
    }

    const selectedContents = range.cloneContents();

    const elements: HTMLElement[] = [];

    while (currentElement && currentElement !== stopElement) {
      elements.push(currentElement);
      currentElement = currentElement.parentElement;
    }

    let contents: Node = selectedContents;

    for (let i = 0; i < elements.length; i++) {
      const clonedElement = elements[i].cloneNode(false) as HTMLElement;

      clonedElement.appendChild(contents);

      contents = clonedElement;
    }

    const fragment = document.createDocumentFragment();
    fragment.appendChild(contents);

    return fragment;
  };

  const removeEmptyNestedElements = ({ root }: { root: Node }) => {
    if (!(root instanceof Element || root instanceof DocumentFragment)) return;

    const elements = Array.from(root.querySelectorAll('*')).reverse();

    elements.forEach((element) => {
      if (element.textContent === '') {
        element.remove();
      }
    });
  };

  // ******** LINK RICH TEXT HELPER FUNCTIONS ********

  const getRichTextLinkURLAtCaret = ({ range }: { range: Range }) => {
    const container = range.startContainer;

    if (!(container instanceof Text)) return '';

    const linkElement = container.parentElement?.closest('a');

    if (!(linkElement instanceof HTMLAnchorElement)) return '';

    return linkElement.getAttribute('href') ?? '';
  };

  const removeRichTextLinkAtCaret = ({ range }: { range: Range }) => {
    if (!range.collapsed) return;

    const container = range.startContainer;

    if (!(container instanceof Text)) return;

    const linkElement = container.parentElement?.closest('a');

    if (!(linkElement instanceof HTMLAnchorElement)) return;

    // Remove the <a> while keeping its contents
    const parent = linkElement.parentNode;

    if (!parent) return;

    while (linkElement.firstChild) {
      parent.insertBefore(linkElement.firstChild, linkElement);
    }

    linkElement.remove();
  };

  // ******** TEXT SELECTION EVENT HANDLER ********

  const setRichTextSelection = () => {
    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    if (!range.startContainer.isConnected || !range.endContainer.isConnected) {
      return;
    }

    const commonAncestorElement =
      range.commonAncestorContainer instanceof Element
        ? range.commonAncestorContainer
        : range.commonAncestorContainer.parentElement;

    if (!commonAncestorElement) return;

    // Find the editable content area
    const attributeElement = commonAncestorElement.closest('[contenteditable="true"][data-block-attribute-key]');

    if (!attributeElement) return;

    // Find the containing block
    const blockElement = attributeElement.closest('[data-block-id]');

    if (!blockElement) return;

    const blockId = blockElement.getAttribute('data-block-id');

    const blockAttributeKey = attributeElement.getAttribute('data-block-attribute-key');

    const blockAttributeListItemId = attributeElement.getAttribute('data-block-list-item-id') ?? '';

    if (!blockId || !blockAttributeKey) return;

    typographySelectionRef.current = {
      range: range.cloneRange(),
      blockId,
      blockAttributeKey,
      blockAttributeListItemId,
    };
  };

  // ******** CONTENT BLOCK RICH TEXT EVENT HANDLERS ********

  const handleContentBlockRichText = ({
    block,
    type,
    linkURL,
  }: {
    block: ContentBlocks;
    type: RichTextType;
    linkURL?: string;
  }) => {
    const typographySelection = typographySelectionRef.current;

    if (!typographySelection) return;

    const { blockId, blockAttributeKey, blockAttributeListItemId, range } = typographySelection;

    if (blockId !== block.id) return;

    if (range.collapsed) {
      const isCurrentlyActive = contentBlockRichTextActive.includes(type);

      if (isCurrentlyActive && range.startContainer instanceof Text) {
        const richTextTagName = richTextTypes[type].tagName;

        const richTextElement = range.startContainer.parentElement?.closest(richTextTagName);

        if (
          richTextElement &&
          isCaretAtEndOfRichTextElement({
            range,
            element: richTextElement,
          })
        ) {
          moveCaretAfterRichTextElement({
            element: richTextElement,
          });
        }
      }

      setContentBlockRichTextActive(type);

      return;
    }

    // get selected block attribute element

    const attributeElement = getBlockAttributeElement({ blockId, blockAttributeKey, blockAttributeListItemId });

    if (!attributeElement) return;

    // get text nodes

    const textNodes = getTextNodesInRange(range, attributeElement);

    const meaningfulTextNodes = textNodes.filter((node) => {
      const selectedText = getSelectedText(node, range);

      return selectedText.trim() !== '';
    });

    const allRichTextType =
      meaningfulTextNodes.length > 0 && meaningfulTextNodes.every((node) => isNodeRichTextType({ type, node }));

    const someRichTextType = meaningfulTextNodes.some((node) => isNodeRichTextType({ type, node }));

    const hasOtherRichText = hasOtherRichTextType({
      type,
      textNodes,
    });

    let content: string | undefined = '';

    if (allRichTextType) {
      content = removeRichTextTypeFromRange({
        type,
        range,
        textNodes,
        attributeElement,
      });
    } else if (someRichTextType || hasOtherRichText) {
      content = applyRichTextTypeToMixedRange({
        type,
        range,
        textNodes,
        attributeElement,
        linkURL,
      });
    } else {
      content = applyRichTextTypeToRange({
        type,
        range,
        attributeElement,
        linkURL,
      });
    }

    if (content) {
      if (block.type !== 'list') {
        updateContentBlockAttribute({
          blockId: block.id,
          blockType: block.type,
          attribute: blockAttributeKey,
          value: content,
        });
      } else {
        if (!blockAttributeListItemId) return;

        updateListBlockItemContent({
          blockId: block.id,
          itemId: blockAttributeListItemId,
          content,
        });
      }
    }
  };

  const handleContentBlockRichTextSelect = () => {
    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    if (range.collapsed) {
      const activeRichText = getRichTextTypesAtCaret({
        range,
      });

      setContentBlockCaretRichTextActive(activeRichText);

      setContentBlockRichTextLinkActive(false);
      setContentBlockRichTextLinkURL('');

      if (activeRichText.includes('link')) {
        setContentBlockRichTextLinkActive(true);

        const linkURL = getRichTextLinkURLAtCaret({ range });

        setContentBlockRichTextLinkURL(linkURL);
      }

      return;
    }

    /*
     * When text is selected by dragging, use the end of the
     * selection to determine the active rich-text types.
     */
    const selectionEndRange = range.cloneRange();

    selectionEndRange.collapse(false);

    const activeRichText = getRichTextTypesAtCaret({
      range: selectionEndRange,
    });

    setContentBlockCaretRichTextActive(activeRichText);
  };

  const handleContentBlockRichTextLinkRemove = () => {
    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    removeRichTextLinkAtCaret({ range });
  };

  return {
    setRichTextSelection,
    handleContentBlockRichText,
    handleContentBlockRichTextSelect,
    handleContentBlockRichTextLinkRemove,
    applyActiveRichTextToInsertedText,
    getRichTextTypesAtCaret,
    removeActiveRichTextFromInsertedText,
  };
}
