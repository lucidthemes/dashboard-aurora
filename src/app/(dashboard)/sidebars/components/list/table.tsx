'use client';

import { DataTable } from '@/components/ui/data-table';

import type { SidebarsList } from '../../schemas/list.schema';
import SidebarsListColumns from './columns';

export default function SidebarsListTable({ sidebarsList }: { sidebarsList: SidebarsList[] }) {
  const sidebarsListColumns = SidebarsListColumns();

  return <DataTable columns={sidebarsListColumns} data={sidebarsList} />;
}
