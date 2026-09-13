import ListControls from '@/components/list/controls';

import getPostsTags from '../../data/get-posts-tags';
import PostsTagsListTable from './table';

interface PostsTagsListProps {
  page: number;
  limit: number;
  search?: string;
  sort?: string;
}

export default async function PostsTagsList({ page, search, limit, sort }: PostsTagsListProps) {
  const { tags, totalCount } = await getPostsTags(page, limit, search, sort);

  return (
    <>
      <PostsTagsListTable tagsList={tags} />
      <ListControls page={page} limit={limit} totalCount={totalCount} />
    </>
  );
}
