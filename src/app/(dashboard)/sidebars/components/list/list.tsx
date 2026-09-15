import ListControls from '@/components/list/controls';

import getSidebars from '../../data/get-sidebars';
import SidebarsListTable from './table';

interface SidebarsListProps {
  page: number;
  limit: number;
  search?: string;
  sort?: string;
}

export default async function SidebarsList({ page, limit, search, sort }: SidebarsListProps) {
  const { sidebars, totalCount } = await getSidebars(page, limit, search, sort);

  return (
    <>
      <SidebarsListTable sidebarsList={sidebars} />
      <ListControls page={page} limit={limit} totalCount={totalCount} />
    </>
  );
}
