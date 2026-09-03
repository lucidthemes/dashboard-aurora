import Image from 'next/image';
import { Check } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';

import { getPublicMediaUrl } from '@/lib/supabase/storage';

import type { EditorMediaItem } from '../../../schemas/media/media.schema';
import { useEditorStore } from '../../../store/editor-store';
import type { ContentBlocks } from '../../../schemas/content/content-blocks.schema';
import type { GalleryContentBlockItem } from '../../../blocks/gallery/schema';

interface EditorMediaListBlockItemImageProps {
  blockType: ContentBlocks['type'];
  item: EditorMediaItem;
  singleMediaDialogItem: string | null;
  multipleMediaDialogItems: GalleryContentBlockItem[];
  mediaDialogCount: 'single' | 'multiple' | null;
  mediaDialogBlockId: string | null;
}

export default function EditorMediaListBlockItemImage({
  blockType,
  item,
  singleMediaDialogItem,
  multipleMediaDialogItems,
  mediaDialogCount,
  mediaDialogBlockId,
}: EditorMediaListBlockItemImageProps) {
  const {
    addImageBlockImage,
    removeImageBlockImage,
    addMediaTextBlockMedia,
    removeMediaTextBlockMedia,
    addGalleryBlockImage,
    removeGalleryBlockImage,
  } = useEditorStore(
    useShallow((state) => ({
      addImageBlockImage: state.addImageBlockImage,
      removeImageBlockImage: state.removeImageBlockImage,
      addMediaTextBlockMedia: state.addMediaTextBlockMedia,
      removeMediaTextBlockMedia: state.removeMediaTextBlockMedia,
      addGalleryBlockImage: state.addGalleryBlockImage,
      removeGalleryBlockImage: state.removeGalleryBlockImage,
    })),
  );

  const publicMediaUrl = getPublicMediaUrl(item.storage_path);

  let isSelectedImage = false;

  if (mediaDialogCount === 'single') {
    isSelectedImage = publicMediaUrl && singleMediaDialogItem === publicMediaUrl ? true : false;
  } else if (mediaDialogCount === 'multiple') {
    isSelectedImage = multipleMediaDialogItems.some((item) => item.url.value === publicMediaUrl);
  }

  return (
    <li
      key={item.id}
      className="relative h-full w-full cursor-pointer overflow-hidden rounded-md"
      onClick={() => {
        if (!mediaDialogBlockId) return;

        if (mediaDialogCount === 'single') {
          if (!isSelectedImage) {
            if (blockType === 'image') {
              addImageBlockImage({ blockId: mediaDialogBlockId, url: publicMediaUrl, altText: item.alt_text ?? '' });
            }
            if (blockType === 'mediaText') {
              addMediaTextBlockMedia({
                blockId: mediaDialogBlockId,
                mediaType: 'image',
                mediaUrl: publicMediaUrl,
                mediaAltText: item.alt_text ?? '',
              });
            }
          } else {
            if (blockType === 'image') {
              removeImageBlockImage({ blockId: mediaDialogBlockId });
            }
            if (blockType === 'mediaText') {
              removeMediaTextBlockMedia({ blockId: mediaDialogBlockId });
            }
          }
        } else if (mediaDialogCount === 'multiple') {
          if (!isSelectedImage) {
            if (blockType === 'gallery') {
              addGalleryBlockImage({ blockId: mediaDialogBlockId, url: publicMediaUrl, altText: item.alt_text ?? '' });
            }
          } else {
            if (blockType === 'gallery') {
              removeGalleryBlockImage({ blockId: mediaDialogBlockId, url: publicMediaUrl });
            }
          }
        }
      }}
    >
      <Image
        src={publicMediaUrl}
        alt={item.alt_text ?? ''}
        width={180}
        height={180}
        className="aspect-square object-cover"
      />
      {isSelectedImage && (
        <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-muted">
          <Check />
        </div>
      )}
    </li>
  );
}
