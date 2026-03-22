import ListControls from '@/components/list/controls';

import getLogs from '../../data/get-logs';
import LogsListTable from './table';

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
    <>
      <LogsListTable logsList={logs} />
      <ListControls page={page} limit={limit} totalCount={totalCount} limitOptions={limitOptions} />
    </>
  );
}
