import { Metadata } from 'next';
import { Suspense } from 'react';

import MainContainer from '@/components/dashboard/main-container';
import { LoadingSpinner } from '@/components/loading';

import InstagramFeedPageHeading from './components/page-heading';
import InstagramFeedPageWrapper from './components/page-wrapper';
import InstagramFeedList from './components/feed-list';

export const metadata: Metadata = {
  title: 'Instagram feed',
  description: 'Create and edit instagram feeds',
};

export default function InstagramFeedPage() {
  return (
    <MainContainer>
      <InstagramFeedPageWrapper>
        <InstagramFeedPageHeading />
        <Suspense fallback={<LoadingSpinner />}>
          <InstagramFeedList />
        </Suspense>
      </InstagramFeedPageWrapper>
    </MainContainer>
  );
}
