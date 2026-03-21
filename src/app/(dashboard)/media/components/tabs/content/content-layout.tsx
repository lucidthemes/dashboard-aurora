'use client';

import type { Media } from '@/schemas/media.schema';

import { useMediaStore } from '../../../store/media-store';
import MediaTabsContentLayoutGrid from './grid';
import MediaTabsContentLayoutTable from './table';

export default function MediaTabsContentLayout({ media, type }: { media: Media[]; type: 'images' | 'videos' }) {
  const { layout } = useMediaStore();

  return (
    <>
      {layout === 'grid' ? (
        <MediaTabsContentLayoutGrid media={media} />
      ) : (
        <MediaTabsContentLayoutTable media={media} type={type} />
      )}
    </>
  );
}
