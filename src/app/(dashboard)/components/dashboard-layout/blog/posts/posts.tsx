import { Suspense } from 'react';

import { LoadingSpinner } from '@/components/loading';

import DashboardPageLayoutBlogPostsList from './list';

export default async function DashboardPageLayoutBlogPosts() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DashboardPageLayoutBlogPostsList />
    </Suspense>
  );
}
