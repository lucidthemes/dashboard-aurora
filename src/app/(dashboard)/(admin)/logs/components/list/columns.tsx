'use client';

import type { ColumnDef } from '@tanstack/react-table';

import { dateTimeFormat } from '@/lib/formatters';

import type { LogsList } from '../../schemas/logs-list.schema';

export default function LogsListColumns() {
  const columns: ColumnDef<LogsList>[] = [];

  columns.push({
    accessorKey: 'id',
    header: 'Id',
  });

  columns.push({
    accessorKey: 'log_level',
    header: 'Log level',
    cell: ({ row }) => {
      const item = row.original;

      return <span className="capitalize">{item.log_level}</span>;
    },
  });

  columns.push({
    accessorKey: 'event_name',
    header: 'Event name',
    cell: ({ row }) => {
      const item = row.original;

      return <span className="break-all">{item.event_name}</span>;
    },
  });

  columns.push({
    accessorKey: 'user_id',
    header: 'User id',
  });

  columns.push({
    accessorKey: 'message',
    header: 'Message',
  });

  columns.push({
    accessorKey: 'source',
    header: 'Source',
    cell: ({ row }) => {
      const item = row.original;

      return <span className="capitalize">{item.source}</span>;
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
