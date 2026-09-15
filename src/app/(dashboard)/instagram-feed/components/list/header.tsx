import ListSearch from '@/components/list/search';
import ListSort from '@/components/list/sort';

export default function InstagramFeedListHeader({ search }: { search?: string }) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
      <ListSearch placeholder="Feed ID or Name" search={search} />
      <ListSort />
    </div>
  );
}
