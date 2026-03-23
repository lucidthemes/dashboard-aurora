import { Metadata } from 'next';
import { Suspense } from 'react';

import MainContainer from '@/app/(dashboard)/components/container';
import { LoadingSpinner } from '@/components/loading';

import UsersPageWrapper from './components/page/wrapper';
import UsersPageHeading from './components/page/heading';
import UsersListHeader from './components/list/header';
import UsersList from './components/list/list';

export const metadata: Metadata = {
  title: 'Users',
  description: 'View users and edit roles',
};

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: number;
    limit?: number;
    search?: string;
    filter_role?: string;
    sort?: string;
  }>;
}) {
  const { page = 1, limit = 12, search = '', filter_role = '', sort = '' } = await searchParams;

  return (
    <MainContainer>
      <UsersPageWrapper>
        <UsersPageHeading />
        <div className="flex flex-col gap-5">
          <UsersListHeader search={search} />
          <Suspense fallback={<LoadingSpinner />}>
            <UsersList page={page} limit={limit} search={search} filterRole={filter_role} sort={sort} />
          </Suspense>
        </div>
      </UsersPageWrapper>
    </MainContainer>
  );
}
