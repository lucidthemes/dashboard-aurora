import { Metadata } from 'next';
import { Suspense } from 'react';

import MainContainer from '@/app/(dashboard)/components/container';
import ListSort from '@/components/list/sort';
import { LoadingSpinner } from '@/components/loading';

import PostsCategoriesPageWrapper from './components/page/wrapper';
import PostsCategoriesPageHeading from './components/page/heading';
import PostsCategoriesList from './components/list';

export const metadata: Metadata = {
  title: 'Categories',
  description: 'View posts categories list',
};

export default async function PostsCategoriesPage({
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
      <PostsCategoriesPageWrapper>
        <PostsCategoriesPageHeading />
        <div className="flex flex-col gap-5">
          <div className="flex self-end">
            <ListSort />
          </div>
          <Suspense fallback={<LoadingSpinner />}>
            <PostsCategoriesList page={page} limit={limit} sort={sort} />
          </Suspense>
        </div>
      </PostsCategoriesPageWrapper>
    </MainContainer>
  );
}
