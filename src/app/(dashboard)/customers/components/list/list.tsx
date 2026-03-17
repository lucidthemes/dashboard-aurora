import getCustomers from '../../data/get-customers';

import CustomersListTable from './table';
import CustomersListSearch from './search';
import CustomersListControls from './controls';

interface CustomersListProps {
  page: number;
  limit: number;
  search?: string;
}

export default async function CustomersList({ page, limit, search }: CustomersListProps) {
  const { customers, totalCount } = await getCustomers(page, limit, search);

  return (
    <div className="flex flex-col gap-5">
      <CustomersListSearch search={search} />
      <CustomersListTable customersList={customers} />
      <CustomersListControls page={page} limit={limit} totalCount={totalCount} />
    </div>
  );
}
