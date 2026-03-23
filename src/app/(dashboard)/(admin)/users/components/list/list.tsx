import ListControls from '@/components/list/controls';

import UsersListTable from './table';

import getUsers from '../../data/get-users';

interface UsersListProps {
  page: number;
  limit: number;
  search?: string;
  filterRole?: string;
  sort?: string;
}

export default async function UsersList({ page, limit, search, filterRole, sort }: UsersListProps) {
  const { users, totalCount } = await getUsers(page, limit, search, filterRole, sort);

  return (
    <>
      <UsersListTable usersList={users} />
      <ListControls page={page} limit={limit} totalCount={totalCount} />
    </>
  );
}
