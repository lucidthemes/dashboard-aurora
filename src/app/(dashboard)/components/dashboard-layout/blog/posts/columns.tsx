'use client';

import type { ColumnDef } from '@tanstack/react-table';

import { dateTimeFormat } from '@/lib/formatters';

import type { DashboardPageLayoutBlogPosts } from './posts.schema';

export default function DashboardPageLayoutBlogPostsListColumns() {
  const columns: ColumnDef<DashboardPageLayoutBlogPosts>[] = [];

  columns.push({
    accessorKey: 'title',
    header: 'Title',
  });

  columns.push({
    accessorKey: 'author',
    header: 'Author',
    cell: ({ row }) => {
      const item = row.original;

      if (!item.author) return;

      return item.author.name;
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
