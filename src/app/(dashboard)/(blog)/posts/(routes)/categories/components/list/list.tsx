import ListControls from '@/components/list/controls';

import getPostsCategories from '../../data/get-posts-categories';
import PostsCategoriesListTable from './table';

interface PostsCategoriesListProps {
  page: number;
  limit: number;
  sort?: string;
}

export default async function PostsCategoriesList({ page, limit, sort }: PostsCategoriesListProps) {
  const { categories, totalCount } = await getPostsCategories(page, limit, sort);

  return (
    <>
      <PostsCategoriesListTable categoriesList={categories} />
      <ListControls page={page} limit={limit} totalCount={totalCount} />
    </>
  );
}
