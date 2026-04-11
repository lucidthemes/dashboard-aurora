import { Metadata } from 'next';
import { Suspense } from 'react';

import MainContainer from '@/app/(dashboard)/components/container';
import ListSort from '@/components/list/sort';
import { LoadingSpinner } from '@/components/loading';

import PostsTagsPageWrapper from './components/page/wrapper';
import PostsTagsPageHeading from './components/page/heading';
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
    sort?: string;
  }>;
}) {
  const { page = 1, limit = 12, sort = '' } = await searchParams;

  return (
    <MainContainer>
      <PostsTagsPageWrapper>
        <PostsTagsPageHeading />
        <div className="flex flex-col gap-5">
          <div className="flex self-end">
            <ListSort />
          </div>
          <Suspense fallback={<LoadingSpinner />}>
            <PostsTagsList page={page} limit={limit} sort={sort} />
          </Suspense>
        </div>
      </PostsTagsPageWrapper>
    </MainContainer>
  );
}
