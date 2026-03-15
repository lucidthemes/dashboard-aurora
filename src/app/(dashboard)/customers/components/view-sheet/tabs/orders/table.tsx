'use client';

import { DataTable } from '@/components/ui/data-table';

import CustomersViewSheetTabOrdersColumns from './columns';
import type { CustomerViewSheetOrders } from '../../../../schemas/view-sheet/orders.schema';

export default function CustomersViewSheetTabOrdersTable({
  customerOrders,
}: {
  customerOrders: CustomerViewSheetOrders[];
}) {
  const customersViewSheetTabOrdersColumns = CustomersViewSheetTabOrdersColumns();

  return <DataTable columns={customersViewSheetTabOrdersColumns} data={customerOrders} />;
}
