import { Metadata } from 'next';
import { Suspense } from 'react';

import MainContainer from '@/app/(dashboard)/components/container';
import { LoadingSpinner } from '@/components/loading';

import PostsPageWrapper from './components/page/wrapper';
import PostsPageHeading from './components/page/heading';
import PostsListHeader from './components/list/header';
import PostsList from './components/list';

export const metadata: Metadata = {
  title: 'Posts',
  description: 'View posts list',
};

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: number;
    limit?: number;
    search?: string;
    filter_author?: string;
    filter_category?: string;
    filter_tag?: string;
    filter_status?: string;
    sort?: string;
  }>;
}) {
  const {
    page = 1,
    limit = 12,
    search = '',
    filter_author = '',
    filter_category = '',
    filter_tag = '',
    filter_status = '',
    sort = '',
  } = await searchParams;

  return (
    <MainContainer>
      <PostsPageWrapper>
        <PostsPageHeading />
        <div className="flex flex-col gap-5">
          <PostsListHeader search={search} />
          <Suspense fallback={<LoadingSpinner />}>
            <PostsList
              page={page}
              limit={limit}
              search={search}
              filterAuthor={filter_author}
              filterCategory={filter_category}
              filterTag={filter_tag}
              filterStatus={filter_status}
              sort={sort}
            />
          </Suspense>
        </div>
      </PostsPageWrapper>
    </MainContainer>
  );
}
