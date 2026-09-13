import ListControls from '@/components/list/controls';

import getPostsCategories from '../../data/get-posts-categories';
import PostsCategoriesListTable from './table';

interface PostsCategoriesListProps {
  page: number;
  limit: number;
  search?: string;
  sort?: string;
}

export default async function PostsCategoriesList({ page, limit, search, sort }: PostsCategoriesListProps) {
  const { categories, totalCount } = await getPostsCategories(page, limit, search, sort);

  return (
    <>
      <PostsCategoriesListTable categoriesList={categories} />
      <ListControls page={page} limit={limit} totalCount={totalCount} />
    </>
  );
}
