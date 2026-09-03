import type { InfiniteData } from '@tanstack/react-query';
import { useShallow } from 'zustand/react/shallow';

import type { EditorMedia } from '../../../schemas/media/media.schema';
import { useEditorStore } from '@/components/editor/store/editor-store';
import type { GalleryContentBlockItem } from '@/components/editor/blocks/gallery/schema';

import EditorMediaListBlockItemImage from './item-image';
import EditorMediaListBlockItemVideo from './item-video';

interface EditorMediaListBlockItemsProps {
  type: 'image' | 'video';
  data: InfiniteData<EditorMedia | undefined>;
}

export default function EditorMediaListBlockItems({ type, data }: EditorMediaListBlockItemsProps) {
  const { contentBlocks, mediaDialogCount, mediaDialogBlockId } = useEditorStore(
    useShallow((state) => ({
      contentBlocks: state.editorContent?.content,
      mediaDialogCount: state.mediaDialogCount,
      mediaDialogBlockId: state.mediaDialogBlockId,
    })),
  );

  const selectedBlock = contentBlocks?.find((block) => block.id === mediaDialogBlockId);

  if (!selectedBlock) return;

  let singleMediaDialogItem = '';

  let multipleMediaDialogItems: GalleryContentBlockItem[] = [];

  if (selectedBlock) {
    if (mediaDialogCount === 'single') {
      if (selectedBlock.type === 'image' || selectedBlock.type === 'video') {
        if (selectedBlock.attributes?.url?.value) singleMediaDialogItem = selectedBlock.attributes.url?.value;
      } else if (selectedBlock.type === 'mediaText') {
        if (selectedBlock.attributes?.mediaUrl?.value) singleMediaDialogItem = selectedBlock.attributes.mediaUrl?.value;
      }
    } else if (mediaDialogCount === 'multiple') {
      if (selectedBlock.type === 'gallery') {
        if (selectedBlock.attributes?.images?.items) multipleMediaDialogItems = selectedBlock.attributes?.images.items;
      }
    }
  }

  return (
    <>
      {data.pages.flatMap((page) =>
        page?.items.map((item) =>
          type === 'image' ? (
            <EditorMediaListBlockItemImage
              key={item.id}
              blockType={selectedBlock.type}
              item={item}
              singleMediaDialogItem={singleMediaDialogItem}
              multipleMediaDialogItems={multipleMediaDialogItems}
              mediaDialogCount={mediaDialogCount}
              mediaDialogBlockId={mediaDialogBlockId}
            />
          ) : (
            <EditorMediaListBlockItemVideo
              key={item.id}
              blockType={selectedBlock.type}
              item={item}
              singleMediaDialogItem={singleMediaDialogItem}
              mediaDialogCount={mediaDialogCount}
              mediaDialogBlockId={mediaDialogBlockId}
            />
          ),
        ),
      )}
    </>
  );
}
