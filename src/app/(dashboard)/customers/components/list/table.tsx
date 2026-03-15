'use client';

import { DataTable } from '@/components/ui/data-table';

import type { CustomersList } from '../../schemas/customers-list.schema';
import CustomersListColumns from './columns';

export default function CustomersListTable({ customersList }: { customersList: CustomersList[] }) {
  const customersListColumns = CustomersListColumns();

  return <DataTable columns={customersListColumns} data={customersList} />;
}
