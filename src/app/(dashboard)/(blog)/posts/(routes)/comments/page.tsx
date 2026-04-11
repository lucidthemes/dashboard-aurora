import { Metadata } from 'next';
import { Suspense } from 'react';

import MainContainer from '@/app/(dashboard)/components/container';
import { PageHeading } from '@/components/page-headings';
import { LoadingSpinner } from '@/components/loading';

import PostsCommentsListHeader from './components/header';
import PostsCommentsList from './components/list';

export const metadata: Metadata = {
  title: 'Comments',
  description: 'View posts comments list',
};

export default async function PostsCommentsPage({
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
      <PageHeading heading="Comments" />
      <div className="flex flex-col gap-5">
        <PostsCommentsListHeader search={search} />
        <Suspense fallback={<LoadingSpinner />}>
          <PostsCommentsList page={page} limit={limit} filterStatus={filter_status} sort={sort} />
        </Suspense>
      </div>
    </MainContainer>
  );
}
