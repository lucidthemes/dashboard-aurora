'use client';

import { DataTable } from '@/components/ui/data-table';
import type { Media } from '@/schemas/media.schema';

import MediaTabsContentLayoutListColumns from './content-layout-list-columns';

interface MediaTabsContentLayoutListProps {
  media: Media[];
  type: 'images' | 'videos';
}

export default function MediaTabsContentLayoutList({ media, type }: MediaTabsContentLayoutListProps) {
  const mediaListColumns = MediaTabsContentLayoutListColumns(type);

  return <DataTable columns={mediaListColumns} data={media} />;
}
