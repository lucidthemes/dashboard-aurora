'use client';

import { DataTable } from '@/components/ui/data-table';
import type { InstagramFeed } from '@/schemas/instagram-feed.schema';

import InstagramFeedListColumns from './columns';

export default function InstagramFeedListTable({ feedList }: { feedList: InstagramFeed[] }) {
  const instagramFeedListColumns = InstagramFeedListColumns();

  return <DataTable columns={instagramFeedListColumns} data={feedList} />;
}
