'use client';

import { DataTable } from '@/components/ui/data-table';

import type { PostsCategoriesList } from '../../schemas/categories-list.schema';
import PostsCategoriesListColumns from './columns';

export default function PostsCategoriesListTable({ categoriesList }: { categoriesList: PostsCategoriesList[] }) {
  const postsCategoriesListColumns = PostsCategoriesListColumns();

  return <DataTable columns={postsCategoriesListColumns} data={categoriesList} />;
}
