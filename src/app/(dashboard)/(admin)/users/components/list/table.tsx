'use client';

import { DataTable } from '@/components/ui/data-table';

import type { UsersList } from '../../schemas/users-list.schema';
import UsersListColumns from './columns';

export default function UsersListTable({ usersList }: { usersList: UsersList[] }) {
  const usersListColumns = UsersListColumns();

  return <DataTable columns={usersListColumns} data={usersList} />;
}
