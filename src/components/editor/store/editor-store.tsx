import { createContext, useState, useContext } from 'react';
import { createStore, useStore } from 'zustand';
import type { StoreApi } from 'zustand';
import DOMPurify from 'isomorphic-dompurify';

import type { Post } from '@/schemas/post/post.schema';

import { blockRegistry } from '../blocks/blocks';
import type { BlockAttributes } from '../blocks/block.schema';
import type { NewPost } from '../schemas/new-post.schema';
import type { ContentBlocks } from '../schemas/content/content-blocks.schema';
import type { EditorContent } from '../schemas/content/content.schema';
import { sanitizeBlockAttribute, sanitizeContentBlocks } from '../utils/block-sanitize';

type State = {
  editorContent: Post | NewPost | null;
  editorContentUnsavedChanges: boolean;
  editorContentErrors: { path: string; code: string; message?: string }[] | null;

  editorContentBlocksHistory: EditorContent[];
  editorContentBlocksHistoryIndex: number | null;
  editorContentBlocksStyle: 'block' | 'code';

  selectedContentBlock: string | null;
  insertContentBlockIndex: number | null;
  paragraphBlockOnEnterId: string | null;

  contentBlockRichTextActive: ('bold' | 'italic' | 'link' | 'underline' | 'strikethrough')[];
  contentBlockRichTextLinkActive: boolean;
  contentBlockRichTextLinkURL: string | null;

  listBlockItemOnEnterId: string | null;

  mediaDialogOpen: boolean;
  mediaDialogType: 'image' | 'video' | null;
  mediaDialogContext: 'settings' | 'block' | null;
  mediaDialogCount: 'single' | 'multiple' | null;
  mediaDialogBlockId: string | null;

  blocksSidebarOpen: boolean;
  hoveredblocksSidebarBlock: ContentBlocks['type'] | null;
  documentSidebarOpen: boolean;
  settingsSidebarOpen: boolean;
};

type Actions = {
  resetEditorContentUnsavedChanges: () => void;
  setEditorContentErrors: (errors: { path: string; code: string; message?: string }[]) => void;
  resetEditorContentErrors: (
    field: 'status' | 'slug' | 'author_id' | 'media_id' | 'excerpt' | 'categories' | 'tags' | 'related',
  ) => void;

  updateEditorContentBlocksHistory: () => void;
  undoEditorContentBlocksHistory: () => void;
  redoEditorContentBlocksHistory: () => void;
  setEditorContentBlocksStyle: (style: 'block' | 'code') => void;
  updateEditorContentCodeBlocks: (codeBlocks: ContentBlocks[]) => void;
  updateEditorContentTitle: (title: string) => void;

  addContentBlock: ({ blockType, order }: { blockType: ContentBlocks['type']; order: number }) => void;
  removeContentBlock: (blockId: string) => void;
  duplicateContentBlock: (blockId: string) => void;
  moveContentBlock: ({
    blockId,
    currentPosition,
    direction,
  }: {
    blockId: string;
    currentPosition: number;
    direction: 'up' | 'down';
  }) => void;
  dragContentBlock: ({
    blockId,
    currentPosition,
    newPosition,
  }: {
    blockId: string;
    currentPosition: number;
    newPosition: number;
  }) => void;
  updateContentBlockAttribute: ({
    blockId,
    blockType,
    attribute,
    value,
  }: {
    blockId: string;
    blockType: ContentBlocks['type'];
    attribute: string;
    value: string | number | boolean;
  }) => void;
  setSelectedContentBlock: (blockId: string) => void;
  resetSelectedContentBlock: () => void;
  setInsertContentBlockIndex: (index: number) => void;
  resetInsertContentBlockIndex: () => void;
  createNewParagraphBlockOnEnter: ({ content }: { content?: string }) => void;

  setContentBlockRichTextActive: (option: 'bold' | 'italic' | 'link' | 'underline' | 'strikethrough') => void;
  setContentBlockCaretRichTextActive: (options: ('bold' | 'italic' | 'link' | 'underline' | 'strikethrough')[]) => void;
  setContentBlockRichTextLinkActive: (active: boolean) => void;
  setContentBlockRichTextLinkURL: (linkURL: string) => void;

  updateListBlockItemContent: ({
    blockId,
    itemId,
    content,
  }: {
    blockId: string;
    itemId: string;
    content: string;
  }) => void;
  removeListBlockItem: ({ blockId, itemId }: { blockId: string; itemId: string }) => void;
  createNewListBlockItemOnEnter: ({
    blockId,
    itemId,
    content,
  }: {
    blockId: string;
    itemId: string;
    content?: string;
  }) => void;
  addImageBlockImage: ({ blockId, url, altText }: { blockId: string; url: string; altText?: string }) => void;
  removeImageBlockImage: ({ blockId }: { blockId: string }) => void;
  addVideoBlockVideo: ({ blockId, url, altText }: { blockId: string; url: string; altText?: string }) => void;
  removeVideoBlockVideo: ({ blockId }: { blockId: string }) => void;
  addMediaTextBlockMedia: ({
    blockId,
    mediaType,
    mediaUrl,
    mediaAltText,
  }: {
    blockId: string;
    mediaType: 'image' | 'video';
    mediaUrl: string;
    mediaAltText?: string;
  }) => void;
  removeMediaTextBlockMedia: ({ blockId }: { blockId: string }) => void;
  addGalleryBlockImage: ({ blockId, url, altText }: { blockId: string; url: string; altText?: string }) => void;
  removeGalleryBlockImage: ({ blockId, url }: { blockId: string; url: string }) => void;

  updateSettingsFieldContent: ({
    field,
    value,
    option,
  }: {
    field: 'status' | 'slug' | 'author_id' | 'media_id' | 'excerpt' | 'categories' | 'tags' | 'related';
    value: string | undefined | null;
    option?: 'add' | 'remove';
  }) => void;
  removeSettingsImageContent: () => void;
  updateSettingsOptionsContent: ({
    section,
    field,
    value,
  }: {
    section: 'header' | 'sidebar';
    field: string;
    value: string | boolean;
  }) => void;

  setMediaDialogOpen: (open: boolean) => void;
  setMediaDialogType: (type: 'image' | 'video') => void;
  setMediaDialogContext: (context: 'settings' | 'block') => void;
  setMediaDialogCount: (type: 'single' | 'multiple') => void;
  setMediaDialogBlockId: (blockId: string) => void;

  setBlocksSidebarOpen: (open: boolean) => void;
  setBlocksSidebarHoveredBlock: (type: ContentBlocks['type']) => void;
  resetBlocksSidebarHoveredBlock: () => void;
  setDocumentSidebarOpen: (open: boolean) => void;
  setSettingsSidebarOpen: (open: boolean) => void;
};

const EditorContext = createContext<StoreApi<State & Actions> | null>(null);

export default function EditorProvider({
  children,
  initialContent,
}: {
  children: React.ReactNode;
  initialContent: Post | NewPost | null;
}) {
  const [store] = useState(() =>
    createStore<State & Actions>((set) => ({
      // State

      editorContent: initialContent,
      editorContentUnsavedChanges: false,
      editorContentErrors: null,

      editorContentBlocksHistory: [],
      editorContentBlocksHistoryIndex: null,
      editorContentBlocksStyle: 'block',

      selectedContentBlock: null,
      insertContentBlockIndex: null,
      paragraphBlockOnEnterId: null,

      contentBlockRichTextActive: [],
      contentBlockRichTextLinkActive: false,
      contentBlockRichTextLinkURL: null,

      listBlockItemOnEnterId: null,

      mediaDialogOpen: false,
      mediaDialogType: null,
      mediaDialogContext: null,
      mediaDialogCount: null,
      mediaDialogBlockId: null,

      blocksSidebarOpen: false,
      hoveredblocksSidebarBlock: null,
      documentSidebarOpen: false,
      settingsSidebarOpen: true,

      // Actions

      // Editor actions

      resetEditorContentUnsavedChanges: () => set({ editorContentUnsavedChanges: false }),

      setEditorContentErrors: (errors) =>
        set((state) => {
          if (!errors) return state;

          return { editorContentErrors: errors };
        }),

      resetEditorContentErrors: (field) =>
        set((state) => {
          if (!field) return state;

          const updatedErrors = state.editorContentErrors?.filter((error) => error.path !== field);

          return { editorContentErrors: updatedErrors };
        }),

      updateEditorContentBlocksHistory: () =>
        set((state) => {
          if (!state.editorContent) return state;

          // if history index is null (undo not previously clicked) - append blocks content to blocks history
          // if history is not null (undo has been clicked) - remove history after history index
          const updatedHistory =
            state.editorContentBlocksHistoryIndex === null
              ? [...state.editorContentBlocksHistory, state.editorContent.content]
              : state.editorContentBlocksHistory.toSpliced(state.editorContentBlocksHistoryIndex + 1);

          return { editorContentBlocksHistory: updatedHistory, editorContentBlocksHistoryIndex: null };
        }),

      undoEditorContentBlocksHistory: () =>
        set((state) => {
          if (!state.editorContent) return state;

          const updatedHistoryIndex =
            state.editorContentBlocksHistoryIndex !== null
              ? state.editorContentBlocksHistoryIndex - 1
              : state.editorContentBlocksHistory.length - 1;

          let updatedBlocksHistory = state.editorContentBlocksHistory;

          // check index is null (undo not clicked previously)
          if (state.editorContentBlocksHistoryIndex === null) {
            // need to append current blocks to existing history to preserve blocks in the editor at the time of clicking undo
            // required for when clicking redo and changing back to state before clicking undo
            updatedBlocksHistory = [...state.editorContentBlocksHistory, state.editorContent.content];
          }

          // select the correct block history to revert the editor back to
          const selectedBlocksHistory = state.editorContentBlocksHistory.at(updatedHistoryIndex);

          if (!selectedBlocksHistory) return state;

          const updatedContent = { ...state.editorContent, content: selectedBlocksHistory };

          return {
            editorContent: updatedContent,
            editorContentBlocksHistory: updatedBlocksHistory,
            editorContentBlocksHistoryIndex: updatedHistoryIndex,
          };
        }),

      redoEditorContentBlocksHistory: () =>
        set((state) => {
          if (!state.editorContent) return state;

          const updatedHistoryIndex =
            state.editorContentBlocksHistoryIndex !== null
              ? state.editorContentBlocksHistoryIndex + 1
              : state.editorContentBlocksHistory.length + 1;

          // select the correct block history to forward the editor to
          const selectedBlocksHistory = state.editorContentBlocksHistory.at(updatedHistoryIndex);

          if (!selectedBlocksHistory) return state;

          const updatedContent = { ...state.editorContent, content: selectedBlocksHistory };

          return { editorContent: updatedContent, editorContentBlocksHistoryIndex: updatedHistoryIndex };
        }),

      setEditorContentBlocksStyle: (style) =>
        set((state) => {
          if (!style) return state;

          return { editorContentBlocksStyle: style };
        }),

      updateEditorContentCodeBlocks: (codeBlocks) =>
        set((state) => {
          if (!state.editorContent || !codeBlocks) return state;

          const sanitizedBlocks = sanitizeContentBlocks({ blocks: codeBlocks });

          if (!sanitizedBlocks) return state;

          const updatedContent = { ...state.editorContent, content: sanitizedBlocks };

          state.updateEditorContentBlocksHistory();

          return { editorContent: updatedContent, editorContentUnsavedChanges: true };
        }),

      updateEditorContentTitle: (title) =>
        set((state) => {
          if (!state.editorContent || !title) return state;

          const cleanTitle = DOMPurify.sanitize(title, {
            ALLOWED_TAGS: [],
          });

          const updatedContent = { ...state.editorContent, title: cleanTitle };

          return { editorContent: updatedContent, editorContentUnsavedChanges: true };
        }),

      // Block actions

      addContentBlock: ({ blockType }) =>
        set((state) => {
          if (!state.editorContent || !blockType) return state;

          const newContentBlock = blockRegistry[blockType]?.create();

          if (!newContentBlock) return state;

          if (state.insertContentBlockIndex === null) {
            const updatedContentBlocks = [...state.editorContent?.content, newContentBlock];

            const updatedContent = { ...state.editorContent, content: updatedContentBlocks };

            state.updateEditorContentBlocksHistory();

            return { editorContent: updatedContent, editorContentUnsavedChanges: true };
          } else {
            const insertBlockPosition = state.insertContentBlockIndex + 1;

            const updatedContentBlocks = state.editorContent.content.toSpliced(insertBlockPosition, 0, newContentBlock);

            const updatedContent = { ...state.editorContent, content: updatedContentBlocks };

            state.updateEditorContentBlocksHistory();

            return { editorContent: updatedContent, editorContentUnsavedChanges: true, insertContentBlockIndex: null };
          }
        }),

      removeContentBlock: (blockId) =>
        set((state) => {
          if (!state.editorContent || !blockId) return state;

          const updatedContentBlocks = state.editorContent.content.filter((block) => block.id !== blockId);

          const updatedContent = { ...state.editorContent, content: updatedContentBlocks };

          state.updateEditorContentBlocksHistory();

          return { editorContent: updatedContent, editorContentUnsavedChanges: true };
        }),

      duplicateContentBlock: (blockId) =>
        set((state) => {
          if (!state.editorContent || !blockId) return state;

          const blockToDuplicate = state.editorContent.content.find((block) => block.id === blockId);

          if (!blockToDuplicate) return state;

          const duplicatedBlockIndex = state.editorContent.content.findIndex((block) => block.id === blockId);

          const newDuplicatedBlock = {
            ...blockToDuplicate,
            id: crypto.randomUUID(),
          };

          const updatedContentBlocks = state.editorContent.content.toSpliced(
            duplicatedBlockIndex + 1,
            0,
            newDuplicatedBlock,
          );

          const updatedContent = { ...state.editorContent, content: updatedContentBlocks };

          state.updateEditorContentBlocksHistory();

          return { editorContent: updatedContent, editorContentUnsavedChanges: true };
        }),

      moveContentBlock: ({ blockId, currentPosition, direction }) =>
        set((state) => {
          if (!state.editorContent || !blockId || !direction) return state;

          const blockToMove = state.editorContent.content.find((block) => block.id === blockId);

          if (!blockToMove) return state;

          const newBlockPosition =
            direction === 'up' ? currentPosition - 1 : direction === 'down' ? currentPosition + 1 : 0;

          const updatedContentBlocks = state.editorContent.content
            .toSpliced(currentPosition, 1) // remove block at current position
            .toSpliced(newBlockPosition, 0, blockToMove); // insert block into new position

          const updatedContent = { ...state.editorContent, content: updatedContentBlocks };

          state.updateEditorContentBlocksHistory();

          return { editorContent: updatedContent, editorContentUnsavedChanges: true };
        }),

      dragContentBlock: ({ blockId, currentPosition, newPosition }) =>
        set((state) => {
          if (!state.editorContent || !blockId) return state;

          const blockToMove = state.editorContent.content.find((block) => block.id === blockId);

          if (!blockToMove) return state;

          const updatedContentBlocks = state.editorContent.content
            .toSpliced(currentPosition, 1) // remove block at current position
            .toSpliced(newPosition, 0, blockToMove); // insert block into new position

          const updatedContent = { ...state.editorContent, content: updatedContentBlocks };

          state.updateEditorContentBlocksHistory();

          return { editorContent: updatedContent, editorContentUnsavedChanges: true };
        }),

      updateContentBlockAttribute: ({ blockId, blockType, attribute, value }) =>
        set((state) => {
          if (!state.editorContent || !blockId || !blockType || !attribute) return state;

          const updatedContentBlocks = state.editorContent?.content.map((block) => {
            if (block.id === blockId) {
              const blockAttributes = block.attributes as BlockAttributes | undefined;
              const blockAttributeType = blockAttributes?.[attribute]?.type ?? 'plain-text';

              const sanitizedAttribute = sanitizeBlockAttribute({ type: blockAttributeType, value });

              return {
                ...block,
                attributes: {
                  ...block.attributes,
                  [attribute]: {
                    type: blockAttributeType,
                    value: sanitizedAttribute,
                  },
                },
              };
            }

            return block;
          });

          const updatedContent = { ...state.editorContent, content: updatedContentBlocks };

          state.updateEditorContentBlocksHistory();

          return { editorContent: updatedContent, editorContentUnsavedChanges: true };
        }),

      setSelectedContentBlock: (blockId) =>
        set((state) => {
          if (!state.editorContent || !blockId) return state;

          const selectedBlockId = state.editorContent.content.find((block) => block.id === blockId)?.id;

          if (!selectedBlockId) return state;

          return { selectedContentBlock: selectedBlockId };
        }),

      resetSelectedContentBlock: () => set({ selectedContentBlock: null }),

      setInsertContentBlockIndex: (index) => set(() => ({ insertContentBlockIndex: index })),

      resetInsertContentBlockIndex: () => set({ insertContentBlockIndex: null }),

      createNewParagraphBlockOnEnter: ({ content }) =>
        set((state) => {
          if (!state.editorContent) return state;

          const selectedContentBlockIndex = state.editorContent.content.findIndex(
            (block) => block.id === state.selectedContentBlock,
          );

          const createParagraphBlock = blockRegistry.paragraph.create();

          if (!createParagraphBlock) return state;

          const newParagraphBlockContent = {
            type: createParagraphBlock.attributes?.content?.type ?? 'rich-text',
            value: content,
          };

          const newParagraphBlock = {
            ...createParagraphBlock,
            attributes: {
              ...createParagraphBlock.attributes,
              content: newParagraphBlockContent,
            },
          };

          const updatedContentBlocks = state.editorContent.content.toSpliced(
            selectedContentBlockIndex + 1,
            0,
            newParagraphBlock,
          );

          const updatedContent = { ...state.editorContent, content: updatedContentBlocks };

          state.updateEditorContentBlocksHistory();

          return {
            editorContent: updatedContent,
            editorContentUnsavedChanges: true,
            selectedContentBlock: newParagraphBlock.id,
            paragraphBlockOnEnterId: newParagraphBlock.id,
          };
        }),

      // Block rich text actions

      setContentBlockRichTextActive: (option) =>
        set((state) => {
          if (!state.editorContent || !option) return state;

          const activeRichTextOption = state.contentBlockRichTextActive.includes(option);

          const updatedRichTextOptions = activeRichTextOption
            ? state.contentBlockRichTextActive.filter((type) => type !== option)
            : [...state.contentBlockRichTextActive, option];

          return { contentBlockRichTextActive: updatedRichTextOptions };
        }),

      setContentBlockCaretRichTextActive: (options) =>
        set((state) => {
          if (!state.editorContent || !options) return state;

          return { contentBlockRichTextActive: options };
        }),

      setContentBlockRichTextLinkActive: (active) =>
        set((state) => {
          if (!state.editorContent) return state;

          return { contentBlockRichTextLinkActive: active };
        }),

      setContentBlockRichTextLinkURL: (linkURL) =>
        set((state) => {
          if (!state.editorContent) return state;

          return { contentBlockRichTextLinkURL: linkURL };
        }),

      // Block actions - list

      updateListBlockItemContent: ({ blockId, itemId, content }) =>
        set((state) => {
          if (!state.editorContent || !blockId || !itemId) return state;

          const updatedContentBlocks = state.editorContent?.content.map((block) => {
            if (block.id === blockId && block.type === 'list') {
              if (!block.attributes || !block.attributes.list) return block;

              const updatedListBlockItems = block?.attributes?.list?.items?.map((item) => {
                if (item.id.value !== itemId) return item;

                const attributeType = item.content.type ?? 'rich-text';
                const attributeValue = content ?? '';

                const sanitizedAttribute = sanitizeBlockAttribute({
                  type: attributeType,
                  value: attributeValue,
                }) as string | undefined;

                const updatedListBlockItem = {
                  ...item,
                  content: {
                    type: attributeType,
                    value: sanitizedAttribute,
                  },
                };

                return updatedListBlockItem;
              });

              const updatedListBlock = {
                ...block,
                attributes: {
                  ...block.attributes,
                  list: {
                    ...block.attributes.list,
                    items: updatedListBlockItems,
                  },
                },
              };

              return updatedListBlock;
            }

            return block;
          });

          const updatedContent = { ...state.editorContent, content: updatedContentBlocks };

          state.updateEditorContentBlocksHistory();

          return { editorContent: updatedContent, editorContentUnsavedChanges: true, listBlockItemOnEnterId: null };
        }),

      removeListBlockItem: ({ blockId, itemId }) =>
        set((state) => {
          if (!state.editorContent || !blockId || !itemId) return state;

          const updatedContentBlocks = state.editorContent?.content.map((block) => {
            if (block.id === blockId && block.type === 'list') {
              if (!block.attributes || !block.attributes.list) return block;

              const listBlockItemIndex =
                block.attributes?.list?.items?.findIndex((item) => item.id.value === itemId) ?? 0;

              const updatedListBlockItems = block.attributes?.list?.items?.toSpliced(listBlockItemIndex, 1);

              const updatedListBlock = {
                ...block,
                attributes: {
                  ...block.attributes,
                  list: {
                    ...block.attributes.list,
                    items: updatedListBlockItems,
                  },
                },
              };

              return updatedListBlock;
            } else {
              return block;
            }
          });

          const updatedContent = { ...state.editorContent, content: updatedContentBlocks };

          state.updateEditorContentBlocksHistory();

          return { editorContent: updatedContent, editorContentUnsavedChanges: true };
        }),

      createNewListBlockItemOnEnter: ({ blockId, itemId, content = '' }) =>
        set((state) => {
          if (!state.editorContent || !blockId) return state;

          let newListItemId = '';

          const updatedContentBlocks = state.editorContent?.content.map((block) => {
            if (block.id === blockId && block.type === 'list') {
              if (!block.attributes || !block.attributes.list) return block;

              const newListItem = blockRegistry.list.createItem();

              if (!newListItem) return block;

              if (content) {
                const attributeType = newListItem.content.type;

                const sanitizedAttribute = sanitizeBlockAttribute({
                  type: attributeType,
                  value: content,
                }) as string | undefined;

                newListItem.content.value = sanitizedAttribute;
              }

              newListItemId = newListItem.id.value ?? '';

              const listBlockItemIndex =
                block.attributes?.list?.items?.findIndex((item) => item.id.value === itemId) ?? 0;

              const updatedListBlockItems = block.attributes?.list?.items?.toSpliced(
                listBlockItemIndex + 1,
                0,
                newListItem,
              );

              const updatedListBlock = {
                ...block,
                attributes: {
                  ...block.attributes,
                  list: {
                    ...block.attributes.list,
                    items: updatedListBlockItems,
                  },
                },
              };

              return updatedListBlock;
            } else {
              return block;
            }
          });

          const updatedContent = { ...state.editorContent, content: updatedContentBlocks };

          state.updateEditorContentBlocksHistory();

          return {
            editorContent: updatedContent,
            editorContentUnsavedChanges: true,
            listBlockItemOnEnterId: newListItemId,
          };
        }),

      // Block actions - image

      addImageBlockImage: ({ blockId, url, altText }) =>
        set((state) => {
          if (!state.editorContent || !blockId || !url) return state;

          const updatedContentBlocks = state.editorContent?.content.map((block) => {
            if (block.id === blockId && block.type === 'image') {
              const attributeUrlType = block.attributes?.url?.type ?? 'plain-text';
              const attributeUrlValue = url ?? '';

              const sanitizedAttributeUrl = sanitizeBlockAttribute({
                type: attributeUrlType,
                value: attributeUrlValue,
              }) as string | undefined;

              const attributeAltTextType = block.attributes?.altText?.type ?? 'plain-text';
              const attributeAltTextValue = altText ?? '';

              const sanitizedAttributeAltText = sanitizeBlockAttribute({
                type: attributeAltTextType,
                value: attributeAltTextValue,
              }) as string | undefined;

              return {
                ...block,
                attributes: {
                  ...block.attributes,
                  url: {
                    type: attributeUrlType,
                    value: sanitizedAttributeUrl,
                  },
                  altText: {
                    type: attributeAltTextType,
                    value: sanitizedAttributeAltText,
                  },
                },
              };
            }

            return block;
          });

          const updatedContent = { ...state.editorContent, content: updatedContentBlocks };

          state.updateEditorContentBlocksHistory();

          return { editorContent: updatedContent, editorContentUnsavedChanges: true };
        }),

      removeImageBlockImage: ({ blockId }) =>
        set((state) => {
          if (!state.editorContent || !blockId) return state;

          const updatedContentBlocks = state.editorContent?.content.map((block) => {
            if (block.id === blockId && block.type === 'image') {
              const attributeUrlType = block.attributes?.url?.type ?? 'plain-text';
              const attributeAltTextType = block.attributes?.altText?.type ?? 'plain-text';
              const attributeCaptionType = block.attributes?.caption?.type ?? 'plain-text';

              return {
                ...block,
                attributes: {
                  ...block.attributes,
                  url: {
                    type: attributeUrlType,
                    value: '',
                  },
                  altText: {
                    type: attributeAltTextType,
                    value: '',
                  },
                  caption: {
                    type: attributeCaptionType,
                    value: '',
                  },
                },
              };
            }

            return block;
          });

          const updatedContent = { ...state.editorContent, content: updatedContentBlocks };

          state.updateEditorContentBlocksHistory();

          return { editorContent: updatedContent, editorContentUnsavedChanges: true };
        }),

      // Block actions - video

      addVideoBlockVideo: ({ blockId, url }) =>
        set((state) => {
          if (!state.editorContent || !blockId || !url) return state;

          const updatedContentBlocks = state.editorContent?.content.map((block) => {
            if (block.id === blockId && block.type === 'video') {
              const attributeUrlType = block.attributes?.url?.type ?? 'plain-text';
              const attributeUrlValue = url ?? '';

              const sanitizedAttributeUrl = sanitizeBlockAttribute({
                type: attributeUrlType,
                value: attributeUrlValue,
              }) as string | undefined;

              return {
                ...block,
                attributes: {
                  ...block.attributes,
                  url: {
                    type: attributeUrlType,
                    value: sanitizedAttributeUrl,
                  },
                },
              };
            }

            return block;
          });

          const updatedContent = { ...state.editorContent, content: updatedContentBlocks };

          state.updateEditorContentBlocksHistory();

          return { editorContent: updatedContent, editorContentUnsavedChanges: true };
        }),

      removeVideoBlockVideo: ({ blockId }) =>
        set((state) => {
          if (!state.editorContent || !blockId) return state;

          const updatedContentBlocks = state.editorContent?.content.map((block) => {
            if (block.id === blockId && block.type === 'video') {
              const attributeUrlType = block.attributes?.url?.type ?? 'plain-text';

              return {
                ...block,
                attributes: {
                  ...block.attributes,
                  url: {
                    type: attributeUrlType,
                    value: '',
                  },
                },
              };
            }

            return block;
          });

          const updatedContent = { ...state.editorContent, content: updatedContentBlocks };

          state.updateEditorContentBlocksHistory();

          return { editorContent: updatedContent, editorContentUnsavedChanges: true };
        }),

      // Block actions - media & text

      addMediaTextBlockMedia: ({ blockId, mediaType, mediaUrl, mediaAltText = '' }) =>
        set((state) => {
          if (!state.editorContent || !blockId || !mediaType || !mediaUrl) return state;

          const updatedContentBlocks = state.editorContent?.content.map((block) => {
            if (block.id === blockId && block.type === 'mediaText') {
              const attributeMediaTypeType = block.attributes?.mediaType?.type ?? 'plain-text';
              const attributeMediaTypeValue = mediaType;

              const sanitizedAttributeMediaType = sanitizeBlockAttribute({
                type: attributeMediaTypeType,
                value: attributeMediaTypeValue,
              }) as 'image' | 'video';

              const attributeMediaUrlType = block.attributes?.mediaUrl?.type ?? 'plain-text';
              const attributeMediaUrlValue = mediaUrl ?? '';

              const sanitizedAttributeMediaUrl = sanitizeBlockAttribute({
                type: attributeMediaUrlType,
                value: attributeMediaUrlValue,
              }) as string | undefined;

              const updatedMediaTextBlock = {
                ...block,
                attributes: {
                  ...block.attributes,
                  mediaType: {
                    type: attributeMediaTypeType,
                    value: sanitizedAttributeMediaType,
                  },
                  mediaUrl: {
                    type: attributeMediaUrlType,
                    value: sanitizedAttributeMediaUrl,
                  },
                },
              };

              if (mediaAltText) {
                const attributeMediaAltTextType = block.attributes?.mediaAltText?.type ?? 'plain-text';
                const attributeMediaAltTextValue = mediaAltText ?? '';

                const sanitizedAttributeMediaAltText = sanitizeBlockAttribute({
                  type: attributeMediaAltTextType,
                  value: attributeMediaAltTextValue,
                }) as string | undefined;

                updatedMediaTextBlock.attributes.mediaAltText = {
                  type: attributeMediaAltTextType,
                  value: sanitizedAttributeMediaAltText,
                };
              } else {
                delete updatedMediaTextBlock.attributes.mediaAltText;
              }

              return updatedMediaTextBlock;
            }

            return block;
          });

          const updatedContent = { ...state.editorContent, content: updatedContentBlocks };

          state.updateEditorContentBlocksHistory();

          return { editorContent: updatedContent, editorContentUnsavedChanges: true };
        }),

      removeMediaTextBlockMedia: ({ blockId }) =>
        set((state) => {
          if (!state.editorContent || !blockId) return state;

          const updatedContentBlocks = state.editorContent?.content.map((block) => {
            if (block.id === blockId && block.type === 'mediaText') {
              const attributeMediaUrlType = block.attributes?.mediaType?.type ?? 'plain-text';
              const attributeMediaAltTextType = block.attributes?.mediaAltText?.type ?? 'plain-text';

              return {
                ...block,
                attributes: {
                  ...block.attributes,
                  mediaUrl: {
                    type: attributeMediaUrlType,
                    value: '',
                  },
                  mediaAltText: {
                    type: attributeMediaAltTextType,
                    value: '',
                  },
                },
              };
            }

            return block;
          });

          const updatedContent = { ...state.editorContent, content: updatedContentBlocks };

          state.updateEditorContentBlocksHistory();

          return { editorContent: updatedContent, editorContentUnsavedChanges: true };
        }),

      // Block actions - gallery

      addGalleryBlockImage: ({ blockId, url, altText = '' }) =>
        set((state) => {
          if (!state.editorContent || !blockId || !url) return state;

          const updatedContentBlocks = state.editorContent?.content.map((block) => {
            if (block.id === blockId && block.type === 'gallery') {
              if (!block.attributes || !block.attributes.images) return block;

              const currentGalleryBlockItems = block.attributes?.images?.items ?? [];

              const newGalleryBlockItem = blockRegistry.gallery.createItem();

              if (!newGalleryBlockItem) return block;

              const attributeUrlType = newGalleryBlockItem.url.type ?? 'plain-text';

              const sanitizedAttributeUrl = sanitizeBlockAttribute({
                type: attributeUrlType,
                value: url,
              }) as string | undefined;

              newGalleryBlockItem.url.value = sanitizedAttributeUrl;

              if (altText) {
                const attributeAltTextType = newGalleryBlockItem.altText?.type ?? 'plain-text';

                const sanitizedAttributeAltText = sanitizeBlockAttribute({
                  type: attributeAltTextType,
                  value: altText,
                }) as string | undefined;

                if (newGalleryBlockItem.altText) newGalleryBlockItem.altText.value = sanitizedAttributeAltText;
              } else {
                delete newGalleryBlockItem.altText;
              }

              const updatedGalleryBlockImages = [...currentGalleryBlockItems, newGalleryBlockItem];

              return {
                ...block,
                attributes: {
                  ...block.attributes,
                  images: {
                    type: block.attributes.images.type,
                    items: updatedGalleryBlockImages,
                  },
                },
              };
            }

            return block;
          });

          const updatedContent = { ...state.editorContent, content: updatedContentBlocks };

          state.updateEditorContentBlocksHistory();

          return { editorContent: updatedContent, editorContentUnsavedChanges: true };
        }),

      removeGalleryBlockImage: ({ blockId, url }) =>
        set((state) => {
          if (!state.editorContent || !blockId || !url) return state;

          const updatedContentBlocks = state.editorContent?.content.map((block) => {
            if (block.id === blockId && block.type === 'gallery') {
              if (!block.attributes || !block.attributes.images) return block;

              const galleryBlockImageIndex =
                block.attributes?.images?.items?.findIndex((image) => image.url.value === url) ?? 0;

              const updatedGalleryBlockImages = block.attributes?.images?.items?.toSpliced(galleryBlockImageIndex, 1);

              const updatedGalleryBlock = {
                ...block,
                attributes: {
                  ...block.attributes,
                  images: {
                    ...block.attributes.images,
                    items: updatedGalleryBlockImages,
                  },
                },
              };

              return updatedGalleryBlock;
            } else {
              return block;
            }
          });

          const updatedContent = { ...state.editorContent, content: updatedContentBlocks };

          state.updateEditorContentBlocksHistory();

          return { editorContent: updatedContent, editorContentUnsavedChanges: true };
        }),

      // Settings actions

      updateSettingsFieldContent: ({ field, value, option }) =>
        set((state) => {
          if (!state.editorContent || !field) return state;

          if (field === 'categories' || field === 'tags' || field === 'related') {
            // update categories, tags, or related

            switch (option) {
              case 'add':
                return {
                  editorContent: { ...state.editorContent, [field]: [...(state.editorContent[field] ?? []), value] },
                  editorContentUnsavedChanges: true,
                };
              case 'remove':
                return {
                  editorContent: {
                    ...state.editorContent,
                    [field]: state.editorContent[field]?.filter((field) => field !== value),
                  },
                  editorContentUnsavedChanges: true,
                };
              default:
                return state;
            }
          } else {
            // update status, slug, author, image, or excerpt

            state.resetEditorContentErrors(field);

            return { editorContent: { ...state.editorContent, [field]: value }, editorContentUnsavedChanges: true };
          }
        }),

      removeSettingsImageContent: () =>
        set((state) => {
          if (!state.editorContent) return state;

          return { editorContent: { ...state.editorContent, media_id: '' }, editorContentUnsavedChanges: true };
        }),

      updateSettingsOptionsContent: ({ section, field, value }) =>
        set((state) => {
          if (!state.editorContent || !state.editorContent.options || !section || !field) return state;

          return {
            editorContent: {
              ...state.editorContent,
              options: {
                ...state.editorContent.options,
                [section]: {
                  ...state.editorContent.options[section],
                  [field]: value,
                },
              },
            },
          };
        }),

      // Media actions

      setMediaDialogOpen: (open) => set({ mediaDialogOpen: open }),
      setMediaDialogType: (type) => set({ mediaDialogType: type }),
      setMediaDialogContext: (context) => set({ mediaDialogContext: context }),
      setMediaDialogCount: (count) => set({ mediaDialogCount: count }),
      setMediaDialogBlockId: (blockId) => set({ mediaDialogBlockId: blockId }),

      // Sidebar actions

      setBlocksSidebarOpen: (open) => set({ blocksSidebarOpen: open }),
      setBlocksSidebarHoveredBlock: (type) =>
        set((state) => {
          if (!state.editorContent || !type) return state;

          return { hoveredblocksSidebarBlock: type };
        }),
      resetBlocksSidebarHoveredBlock: () => set({ hoveredblocksSidebarBlock: null }),
      setDocumentSidebarOpen: (open) => set({ documentSidebarOpen: open }),
      setSettingsSidebarOpen: (open) => set({ settingsSidebarOpen: open }),
    })),
  );

  return <EditorContext.Provider value={store}>{children}</EditorContext.Provider>;
}

export function useEditorStore<T>(selector: (state: State & Actions) => T) {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error('useEditorStore must be used within an EditorProvider');
  }

  return useStore(context, selector);
}
