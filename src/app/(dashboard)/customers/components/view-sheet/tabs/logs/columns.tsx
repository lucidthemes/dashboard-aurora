'use client';

import type { ColumnDef } from '@tanstack/react-table';

import { dateTimeFormat } from '@/lib/formatters';

import type { CustomerViewSheetLogs } from '../../../../schemas/view-sheet/logs.schema';

export default function CustomersViewSheetTabLogsColumns() {
  const columns: ColumnDef<CustomerViewSheetLogs>[] = [];

  columns.push({
    accessorKey: 'log_level',
    header: 'Log level',
    size: 75,
  });

  columns.push({
    accessorKey: 'message',
    header: 'Message',
  });

  columns.push({
    accessorKey: 'created_at',
    header: 'Date',
    cell: ({ row }) => {
      const item = row.original;

      return dateTimeFormat(item.created_at);
    },
  });

  return columns;
}
