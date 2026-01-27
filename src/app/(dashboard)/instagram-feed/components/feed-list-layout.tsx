'use client';

import { DataTable } from '@/components/ui/data-table';
import type { InstagramFeed } from '@/schemas/instagram-feed.schema';

import InstagramFeedListColumns from './feed-list-columns';

export default function InstagramFeedListLayout({ feedList }: { feedList: InstagramFeed[] }) {
  const instagramFeedListColumns = InstagramFeedListColumns();

  return <DataTable columns={instagramFeedListColumns} data={feedList} />;
}
