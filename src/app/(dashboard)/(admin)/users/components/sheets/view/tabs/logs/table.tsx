'use client';

import { DataTable } from '@/components/ui/data-table';

import UsersViewSheetTabLogsColumns from './columns';
import type { UsersViewSheetLogs } from '../../../../../schemas/sheets/logs.schema';

export default function UsersViewSheetTabLogsTable({ userLogs }: { userLogs: UsersViewSheetLogs[] }) {
  const usersViewSheetTabLogsColumns = UsersViewSheetTabLogsColumns();

  return <DataTable columns={usersViewSheetTabLogsColumns} data={userLogs} />;
}
