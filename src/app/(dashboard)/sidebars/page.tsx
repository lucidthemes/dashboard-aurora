import { Metadata } from 'next';
import { Suspense } from 'react';

import MainContainer from '@/app/(dashboard)/components/container';
import { LoadingSpinner } from '@/components/loading';

import SidebarsPageHeading from './components/page/heading';
import SidebarsPageWrapper from './components/page/wrapper';
import SidebarsListHeader from './components/list/header';
import SidebarsList from './components/list';

export const metadata: Metadata = {
  title: 'Sidebars',
  description: 'Create and edit sidebars',
};

export default async function SidebarsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: number; limit?: number; search?: string; sort?: string }>;
}) {
  const { page = 1, limit = 12, search = '', sort = '' } = await searchParams;

  return (
    <MainContainer>
      <SidebarsPageWrapper>
        <SidebarsPageHeading />
        <div className="flex flex-col gap-5">
          <SidebarsListHeader search={search} />
          <Suspense fallback={<LoadingSpinner />}>
            <SidebarsList page={page} limit={limit} search={search} sort={sort} />
          </Suspense>
        </div>
      </SidebarsPageWrapper>
    </MainContainer>
  );
}
