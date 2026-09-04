import Image from 'next/image';
import { Check } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';

import { getPublicMediaUrl } from '@/lib/supabase/storage';
import type { Post } from '@/schemas/post/post.schema';

import type { EditorMediaItem } from '../../../schemas/media/media.schema';
import { useEditorStore } from '../../../store/editor-store';

export default function EditorMediaListSettingsItem({ item }: { item: EditorMediaItem }) {
  const { editorContent, updateSettingsFieldContent } = useEditorStore(
    useShallow((state) => ({
      editorContent: state.editorContent,
      updateSettingsFieldContent: state.updateSettingsFieldContent,
    })),
  );

  const postEditorContent = editorContent as Post;

  const editorContentMediaId = postEditorContent.media_id;

  const publicMediaUrl = getPublicMediaUrl(item.storage_path);

  return (
    <li
      key={item.id}
      className="relative h-full w-full cursor-pointer overflow-hidden rounded-md"
      onClick={() => {
        updateSettingsFieldContent({ field: 'media_id', value: item.id });
      }}
    >
      <Image
        src={publicMediaUrl}
        alt={item.alt_text ?? ''}
        width={180}
        height={180}
        className="aspect-square object-cover"
      />
      {editorContentMediaId === item.id && (
        <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-muted">
          <Check />
        </div>
      )}
    </li>
  );
}
