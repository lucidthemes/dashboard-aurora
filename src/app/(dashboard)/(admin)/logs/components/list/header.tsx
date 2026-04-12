import ListSearch from '@/components/list/search';
import ListSort from '@/components/list/sort';
import { Separator } from '@/components/ui/separator';

import LogsListFilters from './filters';

export default function LogsListHeader({ search }: { search?: string }) {
  return (
    <div className="flex flex-col justify-between gap-5 lg:flex-row">
      <div className="flex flex-col items-center items-start gap-5 lg:flex-row">
        <ListSearch placeholder="User ID" search={search} />
        <Separator orientation="vertical" className="mt-2 hidden h-6! lg:block" />
        <LogsListFilters />
      </div>
      <ListSort />
    </div>
  );
}
