import ListSearch from '@/components/list/search';
import ListSort from '@/components/list/sort';

export default function CustomersListHeader({ search }: { search?: string }) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
      <ListSearch placeholder="Customer ID or Email address" search={search} />
      <ListSort />
    </div>
  );
}
