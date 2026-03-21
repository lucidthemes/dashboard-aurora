import { Suspense } from 'react';
import { Metadata } from 'next';

import MainContainer from '@/components/dashboard/main-container';
import { Tabs } from '@/components/ui/tabs';
import { LoadingSpinner } from '@/components/loading';

import MediaPageWrapper from './components/page/wrapper';
import MediaPageHeading from './components/page/heading';
import MediaTabsHeader from './components/tabs/header';
import MediaTabsContent from './components/tabs/content';

export const metadata: Metadata = {
  title: 'Media',
  description: 'View and upload images and videos',
};

export default async function MediaPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: 'images' | 'videos'; page?: number; limit?: number; sort?: string }>;
}) {
  const { type = 'images', page = 1, limit = 12, sort } = await searchParams;

  return (
    <MainContainer>
      <MediaPageWrapper>
        <MediaPageHeading />
        <Tabs defaultValue="images" className="gap-y-5" value={type}>
          <MediaTabsHeader />
          <Suspense key={type} fallback={<LoadingSpinner />}>
            <MediaTabsContent type={type} page={page} limit={limit} sort={sort} />
          </Suspense>
        </Tabs>
      </MediaPageWrapper>
    </MainContainer>
  );
}
