'use client';

import { DataTable } from '@/components/ui/data-table';

import type { DashboardPageLayoutBlogPosts } from './posts.schema';
import DashboardPageLayoutBlogPostsListColumns from './columns';

export default function DashboardPageLayoutBlogPostsListTable({
  postsList,
}: {
  postsList: DashboardPageLayoutBlogPosts[];
}) {
  const postsListColumns = DashboardPageLayoutBlogPostsListColumns();

  return <DataTable columns={postsListColumns} data={postsList} />;
}
