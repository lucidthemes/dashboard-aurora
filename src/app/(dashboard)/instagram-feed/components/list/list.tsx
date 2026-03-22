import { getInstagramFeeds } from '../../data/get-feeds';
import InstagramFeedListTable from './table';

export default async function InstagramFeedList() {
  const feedList = await getInstagramFeeds();

  return <InstagramFeedListTable feedList={feedList} />;
}
