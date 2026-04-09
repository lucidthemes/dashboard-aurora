import ListControls from '@/components/list/controls';

import getPosts from '../../data/get-posts';
import PostsListTable from './table';

interface PostsListProps {
  page: number;
  limit: number;
  search?: string;
  filterAuthor?: string;
  filterCategory?: string;
  filterTag?: string;
  filterStatus?: string;
  sort?: string;
}

export default async function PostsList({
  page,
  limit,
  search,
  filterAuthor,
  filterCategory,
  filterTag,
  filterStatus,
  sort,
}: PostsListProps) {
  const { posts, totalCount } = await getPosts(
    page,
    limit,
    search,
    filterAuthor,
    filterCategory,
    filterTag,
    filterStatus,
    sort,
  );

  return (
    <>
      <PostsListTable postsList={posts} />
      <ListControls page={page} limit={limit} totalCount={totalCount} />
    </>
  );
}
