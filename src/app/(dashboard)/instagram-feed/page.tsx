import { Metadata } from 'next';
import { Suspense } from 'react';

import MainContainer from '@/app/(dashboard)/components/container';
import { LoadingSpinner } from '@/components/loading';

import InstagramFeedPageHeading from './components/page/heading';
import InstagramFeedPageWrapper from './components/page/wrapper';
import InstagramFeedListHeader from './components/list/header';
import InstagramFeedList from './components/list';

export const metadata: Metadata = {
  title: 'Instagram feed',
  description: 'Create and edit instagram feeds',
};

export default async function InstagramFeedPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: number; limit?: number; search?: string; sort?: string }>;
}) {
  const { page = 1, limit = 12, search = '', sort = '' } = await searchParams;

  return (
    <MainContainer>
      <InstagramFeedPageWrapper>
        <InstagramFeedPageHeading />
        <div className="flex flex-col gap-5">
          <InstagramFeedListHeader search={search} />
          <Suspense fallback={<LoadingSpinner />}>
            <InstagramFeedList page={page} limit={limit} search={search} sort={sort} />
          </Suspense>
        </div>
      </InstagramFeedPageWrapper>
    </MainContainer>
  );
}
