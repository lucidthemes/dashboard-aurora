import ListControls from '@/components/list/controls';

import getInstagramFeeds from '../../data/get-feeds';
import InstagramFeedListTable from './table';

interface InstagramFeedListProps {
  page: number;
  limit: number;
  search?: string;
  sort?: string;
}

export default async function InstagramFeedList({ page, limit, search, sort }: InstagramFeedListProps) {
  const { instagramFeeds, totalCount } = await getInstagramFeeds(page, limit, search, sort);

  return (
    <>
      <InstagramFeedListTable feedList={instagramFeeds} />
      <ListControls page={page} limit={limit} totalCount={totalCount} />
    </>
  );
}
