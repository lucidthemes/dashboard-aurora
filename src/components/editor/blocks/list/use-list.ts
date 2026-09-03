import { useEffect, useRef } from 'react';
import type { InputEvent, KeyboardEvent, ClipboardEvent } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useEditorStore } from '../../store/editor-store';
import useBlocksRichText from '../use-blocks-rich-text';

import type { ListContentBlock } from './schema';

export default function useListBlock({ id, attributes }: Omit<ListContentBlock, 'type'>) {
  const {
    updateListBlockItemContent,
    createNewListBlockItemOnEnter,
    listBlockItemOnEnterId,
    removeListBlockItem,
    removeContentBlock,
    contentBlockRichTextActive,
  } = useEditorStore(
    useShallow((state) => ({
      updateListBlockItemContent: state.updateListBlockItemContent,
      createNewListBlockItemOnEnter: state.createNewListBlockItemOnEnter,
      listBlockItemOnEnterId: state.listBlockItemOnEnterId,
      removeListBlockItem: state.removeListBlockItem,
      removeContentBlock: state.removeContentBlock,
      contentBlockRichTextActive: state.contentBlockRichTextActive,
    })),
  );

  const { applyActiveRichTextToInsertedText, removeActiveRichTextFromInsertedText } = useBlocksRichText();

  const listItemRefs = useRef<Record<string, HTMLLIElement | null>>({});

  useEffect(() => {
    if (!attributes?.list?.items || listBlockItemOnEnterId !== null) return;

    attributes.list.items.forEach((item) => {
      const itemIdValue = item.id.value;

      if (!itemIdValue) return;

      const listElement = listItemRefs.current[itemIdValue];

      if (!listElement) return;

      if (listElement.innerHTML !== item.content.value) {
        listElement.innerHTML = item.content.value ?? '';
      }
    });
  }, [attributes?.list?.items, listBlockItemOnEnterId]);

  const handleListItemInput = ({ e, itemId }: { e: InputEvent<HTMLElement>; itemId: string }) => {
    const listElement = listItemRefs.current[itemId];

    if (!listElement) return;

    const content = listElement.textContent?.trim() ?? '';

    if (content === '') {
      listElement.innerHTML = '';
    }

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
  };

  const handleListItemPaste = ({ e, itemId }: { e: ClipboardEvent<HTMLLIElement>; itemId: string }) => {
    const listElement = listItemRefs.current[itemId];

    if (!listElement) return;

    e.preventDefault();

    const pastedContent = e.clipboardData.getData('text/plain').replace(/\r?\n/g, ' ');

    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    if (!listElement.contains(range.commonAncestorContainer)) {
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

  const handleListItemUpdate = (itemId: string) => {
    const editorListItem = attributes?.list?.items?.find((item) => item.id.value === itemId);

    const listElement = listItemRefs.current[itemId];

    if (!editorListItem || !listElement) return;

    const content = editorListItem.content.type === 'rich-text' ? listElement.innerHTML : listElement.textContent;

    if (content !== editorListItem.content.value) {
      updateListBlockItemContent({ blockId: id, itemId, content });
    }
  };

  const handleNewListItemOnEnter = ({ e, itemId }: { e: KeyboardEvent<HTMLLIElement>; itemId: string }) => {
    if (e.key.toLocaleLowerCase() === 'enter') {
      e.preventDefault();

      const listElement = listItemRefs.current[itemId];

      if (!listElement) return;

      let contentAfterCaret = '';

      if (listElement.textContent !== '') {
        const selection = window.getSelection();
        const range = selection!.getRangeAt(0);
        const afterRange = range.cloneRange();

        afterRange.setEndAfter(listElement.lastChild!);

        const fragment = afterRange.extractContents();

        contentAfterCaret = fragment.textContent ?? '';
      }

      createNewListBlockItemOnEnter({ blockId: id, itemId, content: contentAfterCaret });
    }
  };

  useEffect(() => {
    if (!listBlockItemOnEnterId) return;

    const listBlockItemElement = document.querySelector<HTMLElement>(
      `.block-list[data-block-id="${id}"] li[data-block-list-item-id="${listBlockItemOnEnterId}"]`,
    );

    // change focus to list block item. used for when creating a new list block item on enter so that cursor moves to new item
    if (listBlockItemElement) listBlockItemElement?.focus();
  }, [id, listBlockItemOnEnterId]);

  const handleListBlockOnBackspace = ({
    e,
    blockId,
    itemId,
  }: {
    e: KeyboardEvent<HTMLLIElement>;
    blockId: string;
    itemId: string;
  }) => {
    if (e.key.toLocaleLowerCase() === 'backspace') {
      const listElement = listItemRefs.current[itemId];

      const listBlockItemsLength = attributes?.list?.items?.length;

      if (!listElement || !listBlockItemsLength) return;

      const content = listElement.textContent?.trim() ?? '';

      if (listBlockItemsLength > 1) {
        // more than one item in list - remove only current item

        if (content.length === 0) removeListBlockItem({ blockId, itemId });
      } else {
        // only one item in list - remove whole list block

        if (content.length === 0) removeContentBlock(blockId);
      }
    }
  };

  return {
    listItemRefs,
    handleListItemInput,
    handleListItemPaste,
    handleListItemUpdate,
    handleNewListItemOnEnter,
    handleListBlockOnBackspace,
  };
}
