'use client';

import type { Media } from '@/schemas/media.schema';
import { useMediaStore } from '@/store/media-store';

import MediaTabsContentLayoutGrid from './content-layout-grid';
import MediaTabsContentLayoutList from './content-layout-list';

export default function MediaTabsContentLayout({ media, type }: { media: Media[]; type: 'images' | 'videos' }) {
  const { layout } = useMediaStore();

  return (
    <>
      {layout === 'grid' ? (
        <MediaTabsContentLayoutGrid media={media} />
      ) : (
        <MediaTabsContentLayoutList media={media} type={type} />
      )}
    </>
  );
}
