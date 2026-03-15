'use client';

import CustomersListSearchForm from './form';
import CustomersListSearchClear from './clear';

export default function CustomersListSearch({ search }: { search?: string }) {
  return (
    <div className="flex gap-4">
      <CustomersListSearchForm search={search} />
      {search && <CustomersListSearchClear />}
    </div>
  );
}
