import { Metadata } from 'next';
import { Suspense } from 'react';

import MainContainer from '@/app/(dashboard)/components/container';
import { LoadingSpinner } from '@/components/loading';

import CustomersPageWrapper from './components/page/wrapper';
import CustomersPageHeading from './components/page/heading';

import CustomersListHeader from './components/list/header';
import CustomersList from './components/list';

export const metadata: Metadata = {
  title: 'Customers',
  description: 'View customers list',
};

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: number; limit?: number; search?: string; sort?: string }>;
}) {
  const { page = 1, limit = 12, search = '', sort = '' } = await searchParams;

  return (
    <MainContainer>
      <CustomersPageWrapper>
        <CustomersPageHeading />
        <div className="flex flex-col gap-5">
          <CustomersListHeader search={search} />
          <Suspense key="customers" fallback={<LoadingSpinner />}>
            <CustomersList page={page} limit={limit} search={search} sort={sort} />
          </Suspense>
        </div>
      </CustomersPageWrapper>
    </MainContainer>
  );
}
