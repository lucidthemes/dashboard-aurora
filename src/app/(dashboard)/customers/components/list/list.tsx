import ListControls from '@/components/list/controls';

import getCustomers from '../../data/get-customers';
import CustomersListTable from './table';

interface CustomersListProps {
  page: number;
  limit: number;
  search?: string;
  sort?: string;
}

export default async function CustomersList({ page, limit, search, sort }: CustomersListProps) {
  const { customers, totalCount } = await getCustomers(page, limit, search, sort);

  return (
    <>
      <CustomersListTable customersList={customers} />
      <ListControls page={page} limit={limit} totalCount={totalCount} />
    </>
  );
}
