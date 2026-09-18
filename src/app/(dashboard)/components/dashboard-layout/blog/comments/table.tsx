'use client';

import { DataTable } from '@/components/ui/data-table';

import type { DashboardPageLayoutBlogComments } from './comments.schema';
import DashboardPageLayoutBlogCommentsListColumns from './columns';

export default function DashboardPageLayoutBlogCommentsListTable({
  commentsList,
}: {
  commentsList: DashboardPageLayoutBlogComments[];
}) {
  const commentsListColumns = DashboardPageLayoutBlogCommentsListColumns();

  return <DataTable columns={commentsListColumns} data={commentsList} />;
}
