import { Metadata } from 'next';
import { Suspense } from 'react';

import MainContainer from '@/components/dashboard/main-container';
import { LoadingSpinner } from '@/components/loading';

import CustomersPageWrapper from './components/page/wrapper';
import CustomersPageHeading from './components/page/heading';

import CustomersList from './components/list';

export const metadata: Metadata = {
  title: 'Customers',
  description: 'View customers list',
};

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: number; limit?: number; search?: string }>;
}) {
  const { page = 1, limit = 12, search = '' } = await searchParams;

  return (
    <MainContainer>
      <CustomersPageWrapper>
        <CustomersPageHeading />
        <Suspense key="customers" fallback={<LoadingSpinner />}>
          <CustomersList page={page} limit={limit} search={search} />
        </Suspense>
      </CustomersPageWrapper>
    </MainContainer>
  );
}
