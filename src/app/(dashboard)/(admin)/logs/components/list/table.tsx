'use client';

import { DataTable } from '@/components/ui/data-table';

import type { LogsList } from '../../schemas/logs-list.schema';
import LogsListColumns from './columns';

export default function LogsListTable({ logsList }: { logsList: LogsList[] }) {
  const logsListColumns = LogsListColumns();

  return <DataTable columns={logsListColumns} data={logsList} />;
}
