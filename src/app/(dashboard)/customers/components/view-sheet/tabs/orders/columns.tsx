'use client';

import type { ColumnDef } from '@tanstack/react-table';

import { dateTimeFormat } from '@/lib/formatters';

import type { CustomerViewSheetOrders } from '../../../../schemas/view-sheet/orders.schema';

export default function CustomersViewSheetTabOrdersColumns() {
  const columns: ColumnDef<CustomerViewSheetOrders>[] = [];

  columns.push({
    accessorKey: 'order_id',
    header: 'Order ID',
  });

  columns.push({
    accessorKey: 'total',
    header: 'Total',
    cell: ({ row }) => {
      const item = row.original;

      return <p>£{item.total}</p>;
    },
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
