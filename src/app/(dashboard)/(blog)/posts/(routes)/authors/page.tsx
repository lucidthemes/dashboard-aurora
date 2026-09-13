import { Metadata } from 'next';
import { Suspense } from 'react';

import MainContainer from '@/app/(dashboard)/components/container';
import { LoadingSpinner } from '@/components/loading';

import PostsAuthorsPageWrapper from './components/page/wrapper';
import PostsAuthorsPageHeading from './components/page/heading';
import PostsAuthorsListHeader from './components/list/header';
import PostsAuthorsList from './components/list';

export const metadata: Metadata = {
  title: 'Authors',
  description: 'View posts authors list',
};

export default async function PostsAuthorsPage({
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
      <PostsAuthorsPageWrapper>
        <PostsAuthorsPageHeading />
        <div className="flex flex-col gap-5">
          <PostsAuthorsListHeader search={search} />
          <Suspense fallback={<LoadingSpinner />}>
            <PostsAuthorsList page={page} limit={limit} search={search} sort={sort} />
          </Suspense>
        </div>
      </PostsAuthorsPageWrapper>
    </MainContainer>
  );
}
