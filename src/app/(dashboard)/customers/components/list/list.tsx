import ListSearch from '@/components/list/search';
import ListControls from '@/components/list/controls';
import ListSort from '@/components/list/sort';

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
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
        <ListSearch placeholder="Customer ID or Email address" search={search} />
        <ListSort />
      </div>

      <CustomersListTable customersList={customers} />
      <ListControls page={page} limit={limit} totalCount={totalCount} />
    </div>
  );
}
