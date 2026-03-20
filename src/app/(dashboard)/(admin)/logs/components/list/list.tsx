import ListSearch from '@/components/list/search';
import ListControls from '@/components/list/controls';
import ListSort from '@/components/list/sort';
import { Separator } from '@/components/ui/separator';

import getLogs from '../../data/get-logs';
import LogsListTable from './table';
import LogsListFilters from './filters/filters';

interface LogsListProps {
  page: number;
  limit: number;
  search?: string;
  filterLogLevel?: string;
  filterEventName?: string;
  filterSource?: string;
  sort?: string;
}

export default async function LogsList({
  page,
  limit,
  search,
  filterLogLevel,
  filterEventName,
  filterSource,
  sort,
}: LogsListProps) {
  const { logs, totalCount } = await getLogs(page, limit, search, filterLogLevel, filterEventName, filterSource, sort);

  const limitOptions = [25, 50, 75, 100];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col justify-between gap-5 lg:flex-row">
        <div className="flex flex-col items-center gap-5 lg:flex-row">
          <ListSearch placeholder="User ID" search={search} />
          <Separator orientation="vertical" className="hidden h-6! lg:block" />
          <LogsListFilters />
        </div>
        <ListSort />
      </div>
      <LogsListTable logsList={logs} />
      <ListControls page={page} limit={limit} totalCount={totalCount} limitOptions={limitOptions} />
    </div>
  );
}
