'use client';

import Link from 'next/link';
import type { ColumnDef } from '@tanstack/react-table';

import { dateTimeFormat } from '@/lib/formatters';

import type { PagesList } from '../../schemas/pages-list.schema';
import PagesListColumnActionsButtons from './actions-buttons';

export default function PagesListColumns() {
  const columns: ColumnDef<PagesList>[] = [];

  columns.push({
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => {
      const item = row.original;

      return (
        <Link href={`/page?action=edit&id=${item.id}`} className="hover:underline">
          {item.title}
        </Link>
      );
    },
  });

  columns.push({
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const item = row.original;

      return <span className="capitalize">{item.status}</span>;
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

  columns.push({
    accessorKey: 'updated_at',
    header: 'Updated',
    cell: ({ row }) => {
      const item = row.original;

      return dateTimeFormat(item.updated_at);
    },
  });

  columns.push({
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="flex justify-end gap-x-2.5">
          <PagesListColumnActionsButtons item={item} />
        </div>
      );
    },
  });

  return columns;
}
