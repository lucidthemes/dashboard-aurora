import { Suspense } from 'react';

import ListFilters from '@/components/list/filters/filters';

import PostsListFiltersLoading from './loading';
import PostsListFilterAuthor from './author';
import PostsListFilterCategory from './category';
import PostsListFilterTag from './tag';
import PostsListFilterStatus from './status';

export default function PostsListFilters() {
  return (
    <ListFilters>
      <Suspense fallback={<PostsListFiltersLoading />}>
        <PostsListFilterAuthor />
        <PostsListFilterCategory />
        <PostsListFilterTag />
      </Suspense>
      <PostsListFilterStatus />
    </ListFilters>
  );
}
