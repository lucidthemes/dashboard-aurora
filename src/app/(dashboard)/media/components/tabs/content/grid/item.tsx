import Image from 'next/image';
import { Video } from 'lucide-react';

import { getPublicMediaUrl } from '@/lib/supabase/storage';
import type { Media } from '@/schemas/media.schema';

import MediaTabsContentLayoutGridItemButtons from './buttons';

export default function MediaTabsContentLayoutGridItem({ item }: { item: Media }) {
  const publicMediaUrl = getPublicMediaUrl(item.storage_path);

  return (
    <li className="group relative size-fit overflow-hidden rounded-lg">
      {item.type === 'image' && (
        <Image
          src={publicMediaUrl}
          alt={item.alt_text ?? ''}
          width={250}
          height={250}
          className="aspect-square object-cover"
        />
      )}
      {item.type === 'video' && (
        <div className="flex h-60 w-60 flex-col items-center justify-center gap-y-2.5 bg-sidebar">
          <Video className="h-10 w-10 stroke-ring">
            <source src={publicMediaUrl} type="video/mp4" />
          </Video>
        </div>
      )}
      <MediaTabsContentLayoutGridItemButtons item={item} publicMediaUrl={publicMediaUrl} />
    </li>
  );
}
