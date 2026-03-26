'use client';

import type { ColumnDef } from '@tanstack/react-table';

import { ViewButton } from '@/components/buttons';
import { dateTimeFormat } from '@/lib/formatters';

import { useCustomersStore } from '../../store/customers.store';
import type { CustomersList } from '../../schemas/customers-list.schema';

export default function CustomersListColumns() {
  const { setViewSheetOpen, setViewSheetCustomer } = useCustomersStore();

  const columns: ColumnDef<CustomersList>[] = [];

  columns.push({
    accessorKey: 'id',
    header: 'Id',
  });

  columns.push({
    accessorKey: 'email',
    header: 'Email',
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
    id: 'actions',
    header: 'Actions',
    size: 60,
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="flex justify-end gap-x-2.5">
          <ViewButton
            onClick={() => {
              setViewSheetOpen(true);
              setViewSheetCustomer(item);
            }}
          />
        </div>
      );
    },
  });

  return columns;
}
