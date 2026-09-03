import { VideoIcon, Check } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';

import { getPublicMediaUrl } from '@/lib/supabase/storage';

import type { EditorMediaItem } from '../../../schemas/media/media.schema';
import { useEditorStore } from '../../../store/editor-store';
import type { ContentBlocks } from '../../../schemas/content/content-blocks.schema';

interface EditorMediaListBlockItemVideoProps {
  blockType: ContentBlocks['type'];
  item: EditorMediaItem;
  singleMediaDialogItem: string | null;
  mediaDialogCount: 'single' | 'multiple' | null;
  mediaDialogBlockId: string | null;
}

export default function EditorMediaListBlockItemVideo({
  blockType,
  item,
  singleMediaDialogItem,
  mediaDialogCount,
  mediaDialogBlockId,
}: EditorMediaListBlockItemVideoProps) {
  const { addVideoBlockVideo, removeVideoBlockVideo, addMediaTextBlockMedia, removeMediaTextBlockMedia } =
    useEditorStore(
      useShallow((state) => ({
        addVideoBlockVideo: state.addVideoBlockVideo,
        removeVideoBlockVideo: state.removeVideoBlockVideo,
        addMediaTextBlockMedia: state.addMediaTextBlockMedia,
        removeMediaTextBlockMedia: state.removeMediaTextBlockMedia,
      })),
    );

  if (!mediaDialogBlockId) return;

  const publicMediaUrl = getPublicMediaUrl(item.storage_path);

  const videoStoragePath = item.storage_path.replace('videos/', '');

  return (
    <li
      key={item.id}
      className="relative flex h-60 w-60 cursor-pointer flex-col items-center justify-center gap-y-2.5 rounded-md bg-sidebar"
      onClick={() => {
        if (mediaDialogCount === 'single') {
          if (!singleMediaDialogItem || (publicMediaUrl && singleMediaDialogItem !== publicMediaUrl)) {
            if (blockType === 'video') {
              addVideoBlockVideo({ blockId: mediaDialogBlockId, url: publicMediaUrl });
            }
            if (blockType === 'mediaText') {
              addMediaTextBlockMedia({ blockId: mediaDialogBlockId, mediaType: 'video', mediaUrl: publicMediaUrl });
            }
          } else {
            if (blockType === 'video') {
              removeVideoBlockVideo({ blockId: mediaDialogBlockId });
            }
            if (blockType === 'mediaText') {
              removeMediaTextBlockMedia({ blockId: mediaDialogBlockId });
            }
          }
        }
      }}
    >
      <VideoIcon className="h-10 w-10 stroke-ring" />
      {videoStoragePath}
      {singleMediaDialogItem && publicMediaUrl && singleMediaDialogItem === publicMediaUrl && (
        <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-muted">
          <Check />
        </div>
      )}
    </li>
  );
}
