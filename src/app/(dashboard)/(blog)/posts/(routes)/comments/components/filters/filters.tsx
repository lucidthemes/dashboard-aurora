import ListFilters from '@/components/list/filters/filters';

import PostsCommentsListFilterStatus from './status';

export default function PostsCommentsListFilters() {
  return (
    <ListFilters>
      <PostsCommentsListFilterStatus />
    </ListFilters>
  );
}
