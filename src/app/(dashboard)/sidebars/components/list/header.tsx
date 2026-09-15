import ListSearch from '@/components/list/search';
import ListSort from '@/components/list/sort';

export default function SidebarsListHeader({ search }: { search?: string }) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
      <ListSearch placeholder="Sidebar ID, Name, or Title" search={search} />
      <ListSort />
    </div>
  );
}
