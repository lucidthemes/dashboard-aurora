import ListControls from '@/components/list/controls';

import getPages from '../../data/get-pages';
import PagesListTable from './table';

interface PagesListProps {
  page: number;
  limit: number;
  search?: string;
  filterStatus?: string;
  sort?: string;
}

export default async function PagesList({ page, limit, search, filterStatus, sort }: PagesListProps) {
  const { pages, totalCount } = await getPages(page, limit, search, filterStatus, sort);

  return (
    <>
      <PagesListTable pagesList={pages} />
      <ListControls page={page} limit={limit} totalCount={totalCount} />
    </>
  );
}
