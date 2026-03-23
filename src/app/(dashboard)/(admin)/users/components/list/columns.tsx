'use client';

import type { ColumnDef } from '@tanstack/react-table';

import { dateTimeFormat } from '@/lib/formatters';

import UsersListColumnActionsButtons from './actions-buttons';
import type { UsersList } from '../../schemas/users-list.schema';

export default function UsersListColumns() {
  const columns: ColumnDef<UsersList>[] = [];

  columns.push({
    accessorKey: 'id',
    header: 'Id',
  });

  columns.push({
    accessorKey: 'email',
    header: 'Email',
  });

  columns.push({
    accessorKey: 'role',
    header: 'Role',
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
    accessorKey: 'last_sign_in_at',
    header: 'Last sign in',
    cell: ({ row }) => {
      const item = row.original;

      const lastSignInDate = item.last_sign_in_at ? dateTimeFormat(item.last_sign_in_at) : null;

      return <>{lastSignInDate ? <p className="text-sm">{lastSignInDate}</p> : <p>--</p>}</>;
    },
  });

  columns.push({
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="flex justify-end gap-x-2.5">
          <UsersListColumnActionsButtons item={item} />
        </div>
      );
    },
  });

  return columns;
}
