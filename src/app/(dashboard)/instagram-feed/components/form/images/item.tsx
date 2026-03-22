'use client';

import Image from 'next/image';

import { getPublicMediaUrl } from '@/lib/supabase/storage';

import type { InstagramFeedFormImages } from '../../../schemas/form.schema';
import InstagramFeedFormImagesListItemButtons from './item-buttons';

export default function InstagramFeedFormImagesListItem({ item }: { item: InstagramFeedFormImages }) {
  const publicMediaUrl = getPublicMediaUrl(item.media.storage_path);

  return (
    <li key={item.media.id} className="relative h-full w-full overflow-hidden rounded-md">
      <Image
        src={publicMediaUrl}
        alt={item.media.alt_text ?? ''}
        width={150}
        height={150}
        className="aspect-square object-cover"
      />
      <InstagramFeedFormImagesListItemButtons item={item} />
    </li>
  );
}
