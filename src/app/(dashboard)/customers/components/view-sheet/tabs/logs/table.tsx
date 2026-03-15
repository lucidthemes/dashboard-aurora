'use client';

import { DataTable } from '@/components/ui/data-table';

import CustomersViewSheetTabLogsColumns from './columns';
import type { CustomerViewSheetLogs } from '../../../../schemas/view-sheet/logs.schema';

export default function CustomersViewSheetTabLogsTable({ customerLogs }: { customerLogs: CustomerViewSheetLogs[] }) {
  const customersViewSheetTabLogsColumns = CustomersViewSheetTabLogsColumns();

  return <DataTable columns={customersViewSheetTabLogsColumns} data={customerLogs} />;
}
