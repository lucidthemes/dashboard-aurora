import ListControls from '@/components/list/controls';

import getPostsComments from '../data/get-posts-comments';
import PostsCommentsListTable from './table';

interface PostsCommentsListProps {
  page: number;
  limit: number;
  filterStatus?: string;
  sort?: string;
}

export default async function PostsCommentsList({ page, limit, filterStatus, sort }: PostsCommentsListProps) {
  const { comments, totalCount } = await getPostsComments(page, limit, filterStatus, sort);

  return (
    <>
      <PostsCommentsListTable commentsList={comments} />
      <ListControls page={page} limit={limit} totalCount={totalCount} />
    </>
  );
}
