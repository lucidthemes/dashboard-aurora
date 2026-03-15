'use client';

import type { ColumnDef } from '@tanstack/react-table';

import { dateTimeFormat } from '@/lib/formatters';

import type { CustomerViewSheetReviews } from '../../../../schemas/view-sheet/reviews.schema';

export default function CustomersViewSheetTabReviewsColumns() {
  const columns: ColumnDef<CustomerViewSheetReviews>[] = [];

  columns.push({
    accessorKey: 'product_id',
    header: 'Product ID',
  });

  columns.push({
    accessorKey: 'rating',
    header: 'Rating',
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
