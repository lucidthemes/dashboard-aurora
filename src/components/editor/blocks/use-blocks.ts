import type { InputEvent, KeyboardEvent, ClipboardEvent, RefObject } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useEditorStore } from '../store/editor-store';
import type { ContentBlocks } from '../schemas/content/content-blocks.schema';

import useBlocksRichText from './use-blocks-rich-text';

export default function useBlocks() {
  const {
    setSelectedContentBlock,
    removeContentBlock,
    createNewParagraphBlockOnEnter,
    updateContentBlockAttribute,
    contentBlockRichTextActive,
  } = useEditorStore(
    useShallow((state) => ({
      setSelectedContentBlock: state.setSelectedContentBlock,
      removeContentBlock: state.removeContentBlock,
      createNewParagraphBlockOnEnter: state.createNewParagraphBlockOnEnter,
      updateContentBlockAttribute: state.updateContentBlockAttribute,
      contentBlockRichTextActive: state.contentBlockRichTextActive,
    })),
  );

  const { applyActiveRichTextToInsertedText, removeActiveRichTextFromInsertedText } = useBlocksRichText();

  const handleSelectedContentBlock = (blockId: string) => {
    if (!blockId) return;

    setSelectedContentBlock(blockId);
  };

  const handleBlockContentInput = ({
    e,
    blockContentRef,
    blockContentType,
  }: {
    e: InputEvent<HTMLElement>;
    blockContentRef: RefObject<HTMLHeadingElement | HTMLParagraphElement | HTMLElement | null>;
    blockContentType: 'rich-text' | 'plain-text';
  }) => {
    if (!blockContentRef.current) return;

    const contentElement = blockContentRef.current;

    const content = contentElement.textContent?.trim() ?? '';

    if (content === '') {
      contentElement.innerHTML = '';

      return;
    }

    if (blockContentType === 'rich-text') {
      const activeRichText = contentBlockRichTextActive ?? [];

      const selection = window.getSelection();

      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);

      const inputEvent = e.nativeEvent;

      if (inputEvent.inputType !== 'insertText' || !inputEvent.data) return;

      if (activeRichText.length) {
        applyActiveRichTextToInsertedText({
          range,
          insertedText: inputEvent.data,
          activeRichText,
        });
      } else {
        removeActiveRichTextFromInsertedText({
          range,
          insertedText: inputEvent.data,
        });
      }
    }
  };

  const handleBlockContentPaste = ({
    e,
    blockContentRef,
  }: {
    e: ClipboardEvent<HTMLHeadingElement | HTMLParagraphElement | HTMLElement>;
    blockContentRef: RefObject<HTMLHeadingElement | HTMLParagraphElement | HTMLElement | null>;
  }) => {
    if (!blockContentRef.current) return;

    e.preventDefault();

    const pastedContent = e.clipboardData.getData('text/plain').replace(/\r?\n/g, ' ');

    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    if (!blockContentRef.current.contains(range.commonAncestorContainer)) {
      return;
    }

    // remove any currently selected content so that it gets replaced with pasted content
    range.deleteContents();

    // insert the pasted content as plain text
    const textNode = document.createTextNode(pastedContent);
    range.insertNode(textNode);

    // move the caret to the end of the pasted text
    range.setStartAfter(textNode);
    range.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range);
  };

  const handleBlockContentUpdate = ({
    blockId,
    blockType,
    blockAttribute,
    blockAttributeValue,
    blockContentRef,
    blockContentType,
  }: {
    blockId: string;
    blockType: ContentBlocks['type'];
    blockAttribute: string;
    blockAttributeValue?: string;
    blockContentRef: RefObject<HTMLHeadingElement | HTMLParagraphElement | HTMLElement | null>;
    blockContentType: 'rich-text' | 'plain-text';
  }) => {
    if (!blockContentRef.current) return;

    const content =
      blockContentType === 'rich-text' ? blockContentRef.current.innerHTML : blockContentRef.current.textContent;

    if (content !== blockAttributeValue) {
      updateContentBlockAttribute({
        blockId,
        blockType,
        attribute: blockAttribute,
        value: content,
      });
    }
  };

  const handleRemoveBlockOnBackspace = ({
    e,
    blockRef,
    blockId,
  }: {
    e: KeyboardEvent<HTMLHeadingElement | HTMLParagraphElement>;
    blockRef: RefObject<HTMLHeadingElement | HTMLParagraphElement | null>;
    blockId: string;
  }) => {
    if (e.key.toLocaleLowerCase() === 'backspace') {
      if (!blockRef.current) return;

      const content = blockRef.current.textContent.trim() ?? '';

      if (content.length === 0) removeContentBlock(blockId);
    }
  };

  const handleNewParagraphBlockOnEnter = ({
    e,
    blockRef,
    type = 'block',
  }: {
    e: KeyboardEvent<HTMLHeadingElement | HTMLParagraphElement | HTMLElement>;
    blockRef: RefObject<HTMLHeadingElement | HTMLParagraphElement | HTMLElement | null>;
    type?: 'block' | 'title';
  }) => {
    if (e.key.toLocaleLowerCase() === 'enter') {
      e.preventDefault();

      if (type === 'block') {
        if (!blockRef.current) return;

        let contentAfterCaret = '';

        if (blockRef.current.textContent !== '') {
          const selection = window.getSelection();
          const range = selection!.getRangeAt(0);
          const afterRange = range.cloneRange();

          afterRange.setEndAfter(blockRef.current.lastChild!);

          const fragment = afterRange.extractContents();

          contentAfterCaret = fragment.textContent ?? '';
        }

        createNewParagraphBlockOnEnter({ content: contentAfterCaret });
      } else if (type === 'title') {
        createNewParagraphBlockOnEnter({ content: '' });
      }
    }
  };

  return {
    handleSelectedContentBlock,
    handleBlockContentInput,
    handleBlockContentPaste,
    handleBlockContentUpdate,
    handleRemoveBlockOnBackspace,
    handleNewParagraphBlockOnEnter,
  };
}
