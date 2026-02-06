import { getInstagramFeeds } from '@/lib/instagram-feed';

import InstagramFeedListLayout from './feed-list-layout';

export default async function InstagramFeedList() {
  const feedList = await getInstagramFeeds();

  return <InstagramFeedListLayout feedList={feedList} />;
}
