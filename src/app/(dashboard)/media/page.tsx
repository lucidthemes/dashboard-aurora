import { Suspense } from 'react';
import { Metadata } from 'next';

import MainContainer from '@/components/dashboard/main-container';
import { Tabs } from '@/components/ui/tabs';

import MediaPageWrapper from './media-wrapper';
import MediaPageHeading from './components/page-heading';
import MediaTabsHeader from './components/tabs-header';
import MediaTabsContent from './components/tabs-content';
import MediaLoading from './components/loading';

export const metadata: Metadata = {
  title: 'Media',
  description: 'View and upload images and videos',
};

export default async function MediaPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: 'images' | 'videos'; limit?: number; page?: number }>;
}) {
  const { type = 'images', page = 1, limit = 12 } = await searchParams;

  return (
    <MainContainer>
      <MediaPageWrapper>
        <MediaPageHeading />
        <Tabs defaultValue="images" className="gap-y-5" value={type}>
          <MediaTabsHeader />
          <Suspense key={type} fallback={<MediaLoading type={type} />}>
            <MediaTabsContent type={type} page={page} limit={limit} />
          </Suspense>
        </Tabs>
      </MediaPageWrapper>
    </MainContainer>
  );
}
