'use client';

import Image from 'next/image';
import { Check } from 'lucide-react';

import { getPublicMediaUrl } from '@/lib/supabase/storage';

import { useInstagramFeedStore } from '../../../store/instagram-feed-store';
import type { InstagramFeedMedia } from '../../../schemas/feed.schema';

export default function InstagramFeedFormMediaListItem({ item }: { item: InstagramFeedMedia }) {
  const { selectedImages, addSelectedImage, removeSelectedImage } = useInstagramFeedStore();

  const publicMediaUrl = getPublicMediaUrl(item.storage_path);

  const imageIsSelected = selectedImages.some((selected) => selected.media.id === item.id);

  return (
    <li
      key={item.id}
      className="relative h-full w-full cursor-pointer overflow-hidden rounded-md"
      onClick={() => {
        if (!imageIsSelected) {
          addSelectedImage(item);
        } else {
          removeSelectedImage(item.id);
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
