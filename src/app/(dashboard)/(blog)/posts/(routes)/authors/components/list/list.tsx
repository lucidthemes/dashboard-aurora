import ListControls from '@/components/list/controls';

import getPostsAuthors from '../../data/get-posts-authors';
import PostsAuthorsListTable from './table';

interface PostsAuthorsListProps {
  page: number;
  limit: number;
  search?: string;
  sort?: string;
}

export default async function PostsAuthorsList({ page, limit, search, sort }: PostsAuthorsListProps) {
  const { authors, totalCount } = await getPostsAuthors(page, limit, search, sort);

  return (
    <>
      <PostsAuthorsListTable authorsList={authors} />
      <ListControls page={page} limit={limit} totalCount={totalCount} />
    </>
  );
}
