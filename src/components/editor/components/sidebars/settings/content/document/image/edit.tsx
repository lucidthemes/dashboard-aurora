import Image from 'next/image';
import { Pencil, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { getPublicMediaUrl } from '@/lib/supabase/storage';

import { useEditorSidebarSettingsImageEdit } from '../../../../../../hooks/sidebars/use-image';
import EditorSettingsSidebarContentImageLoading from './loading';
import EditorSettingsSidebarContentImageError from './error';

export default function EditorSettingsSidebarContentImageEdit({ editorMediaId }: { editorMediaId: string }) {
  const { imageQuery, editSettingsImageContent, removeSettingsImageContent } =
    useEditorSidebarSettingsImageEdit(editorMediaId);

  if (imageQuery.isPending) return <EditorSettingsSidebarContentImageLoading />;

  if (imageQuery.isSuccess && !imageQuery.data) return <EditorSettingsSidebarContentImageError />;

  if (imageQuery.isSuccess && imageQuery.data) {
    const imageStoragePath = imageQuery.data.storage_path;
    const imageAltText = imageQuery.data.alt_text;

    const publicMediaUrl = getPublicMediaUrl(imageStoragePath);

    return (
      <>
        {publicMediaUrl ? (
          <div className="relative overflow-hidden rounded-md bg-sidebar">
            <Image src={publicMediaUrl} alt={imageAltText ?? ''} width={300} height={300} className="w-full" />
            <div className="absolute top-2.5 right-2.5 flex gap-x-2.5">
              <Button
                variant="ghost"
                size="icon-sm"
                className="cursor-pointer bg-secondary"
                onClick={editSettingsImageContent}
              >
                <Pencil />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                className="cursor-pointer bg-secondary"
                onClick={removeSettingsImageContent}
              >
                <X />
              </Button>
            </div>
          </div>
        ) : (
          <EditorSettingsSidebarContentImageError />
        )}
      </>
    );
  }
}
