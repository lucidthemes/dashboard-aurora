import { Metadata } from 'next';
import { Suspense } from 'react';

import MainContainer from '@/app/(dashboard)/components/container';
import { LoadingSpinner } from '@/components/loading';

import PagesPageWrapper from './components/page/wrapper';
import PagesPageHeading from './components/page/heading';
import PagesListHeader from './components/list/header';
import PagesList from './components/list';

export const metadata: Metadata = {
  title: 'Pages',
  description: 'View pages list',
};

export default async function PagesPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: number;
    limit?: number;
    search?: string;
    filter_status?: string;
    sort?: string;
  }>;
}) {
  const { page = 1, limit = 12, search = '', filter_status = '', sort = '' } = await searchParams;

  return (
    <MainContainer>
      <PagesPageWrapper>
        <PagesPageHeading />
        <div className="flex flex-col gap-5">
          <PagesListHeader search={search} />
          <Suspense fallback={<LoadingSpinner />}>
            <PagesList page={page} limit={limit} search={search} filterStatus={filter_status} sort={sort} />
          </Suspense>
        </div>
      </PagesPageWrapper>
    </MainContainer>
  );
}
