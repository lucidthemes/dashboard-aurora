'use client';

import { DataTable } from '@/components/ui/data-table';
import type { Media } from '@/schemas/media.schema';

import MediaTabsContentLayoutTableColumns from './columns';

interface MediaTabsContentLayoutListProps {
  media: Media[];
  type: 'images' | 'videos';
}

export default function MediaTabsContentLayoutTable({ media, type }: MediaTabsContentLayoutListProps) {
  const mediaTableColumns = MediaTabsContentLayoutTableColumns(type);

  return <DataTable columns={mediaTableColumns} data={media} />;
}
