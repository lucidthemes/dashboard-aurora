'use client';

import Image from 'next/image';
import { Check } from 'lucide-react';

import { getPublicMediaUrl } from '@/lib/supabase/storage';

import useSidebarsFormWidgetMedia from '../../../../hooks/use-form-widgets-media';
import type { SidebarsFormWidgetMediaItem } from '../../../../schemas/form/media.schema';

export default function SidebarsFormWidgetMediaDialogListItem({
  item,
  mediaDialogWidgetFieldMedia,
}: {
  item: SidebarsFormWidgetMediaItem;
  mediaDialogWidgetFieldMedia: string | null;
}) {
  const { handleSidebarsFormWidgetMediaUpdate } = useSidebarsFormWidgetMedia();

  const publicMediaUrl = getPublicMediaUrl(item.storage_path);

  const imageIsSelected = publicMediaUrl === mediaDialogWidgetFieldMedia;

  return (
    <li
      key={item.id}
      className="relative h-full w-full cursor-pointer overflow-hidden rounded-md"
      onClick={() => {
        if (!imageIsSelected) {
          handleSidebarsFormWidgetMediaUpdate({ widgetFieldValue: publicMediaUrl });
        } else {
          handleSidebarsFormWidgetMediaUpdate({ widgetFieldValue: '' });
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
      {imageIsSelected && (
        <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-muted">
          <Check />
        </div>
      )}
    </li>
  );
}
