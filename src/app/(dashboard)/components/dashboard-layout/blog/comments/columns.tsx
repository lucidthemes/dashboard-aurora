'use client';

import type { ColumnDef } from '@tanstack/react-table';

import { dateTimeFormat } from '@/lib/formatters';

import type { DashboardPageLayoutBlogComments } from './comments.schema';

export default function DashboardPageLayoutBlogCommentsListColumns() {
  const columns: ColumnDef<DashboardPageLayoutBlogComments>[] = [];

  columns.push({
    accessorKey: 'name',
    header: 'Name',
  });

  columns.push({
    accessorKey: 'comment',
    header: 'Comment',
    cell: ({ row }) => {
      const item = row.original;

      if (!item.comment) return;

      const commentLength = 100;

      return item.comment.substring(0, commentLength);
    },
  });

  columns.push({
    accessorKey: 'created_at',
    header: 'Created',
    cell: ({ row }) => {
      const item = row.original;

      return dateTimeFormat(item.created_at);
    },
  });

  return columns;
}
