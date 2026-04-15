'use client';

import { DataTable } from '@/components/ui/data-table';

import type { PagesList } from '../../schemas/pages-list.schema';
import PagesListColumns from './columns';

export default function PagesListTable({ pagesList }: { pagesList: PagesList[] }) {
  const pagesListColumns = PagesListColumns();

  return <DataTable columns={pagesListColumns} data={pagesList} />;
}
