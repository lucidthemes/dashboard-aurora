import ListControls from '@/components/list/controls';

import getPostsAuthors from '../../data/get-posts-authors';
import PostsAuthorsListTable from './table';

interface PostsAuthorsListProps {
  page: number;
  limit: number;
  sort?: string;
}

export default async function PostsAuthorsList({ page, limit, sort }: PostsAuthorsListProps) {
  const { authors, totalCount } = await getPostsAuthors(page, limit, sort);

  return (
    <>
      <PostsAuthorsListTable authorsList={authors} />
      <ListControls page={page} limit={limit} totalCount={totalCount} />
    </>
  );
}
