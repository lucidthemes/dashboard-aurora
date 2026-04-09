import ListSearch from '@/components/list/search';
import ListSort from '@/components/list/sort';
import { Separator } from '@/components/ui/separator';

import PostsListFilters from './filters';

export default function PostsListHeader({ search }: { search?: string }) {
  return (
    <div className="flex flex-col justify-between gap-5 lg:flex-row">
      <div className="flex flex-col items-center gap-5 lg:flex-row">
        <ListSearch placeholder="Post ID or Title" search={search} />
        <Separator orientation="vertical" className="hidden h-6! lg:block" />
        <PostsListFilters />
      </div>
      <ListSort />
    </div>
  );
}
