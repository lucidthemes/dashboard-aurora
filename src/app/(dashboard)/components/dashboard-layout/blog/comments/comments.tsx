import { Suspense } from 'react';

import { LoadingSpinner } from '@/components/loading';

import DashboardPageLayoutBlogCommentsList from './list';

export default function DashboardPageLayoutBlogComments() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DashboardPageLayoutBlogCommentsList />
    </Suspense>
  );
}
