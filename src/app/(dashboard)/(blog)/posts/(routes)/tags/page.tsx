import { Metadata } from 'next';
import { Suspense } from 'react';

import MainContainer from '@/app/(dashboard)/components/container';
import { LoadingSpinner } from '@/components/loading';

import PostsTagsPageWrapper from './components/page/wrapper';
import PostsTagsPageHeading from './components/page/heading';
import PostsTagsListHeader from './components/list/header';
import PostsTagsList from './components/list';

export const metadata: Metadata = {
  title: 'Tags',
  description: 'View posts tags list',
};

export default async function PostsTagsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: number;
    limit?: number;
    search?: string;
    sort?: string;
  }>;
}) {
  const { page = 1, limit = 12, search = '', sort = '' } = await searchParams;

  return (
    <MainContainer>
      <PostsTagsPageWrapper>
        <PostsTagsPageHeading />
        <div className="flex flex-col gap-5">
          <PostsTagsListHeader search={search} />
          <Suspense fallback={<LoadingSpinner />}>
            <PostsTagsList page={page} limit={limit} search={search} sort={sort} />
          </Suspense>
        </div>
      </PostsTagsPageWrapper>
    </MainContainer>
  );
}
