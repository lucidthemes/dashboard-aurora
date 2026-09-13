import ListSearch from '@/components/list/search';
import ListSort from '@/components/list/sort';

export default function PostsCategoriesListHeader({ search }: { search?: string }) {
  return (
    <div className="flex flex-col justify-between gap-5 lg:flex-row">
      <div className="flex flex-col items-center items-start gap-5 lg:flex-row">
        <ListSearch placeholder="Category name" search={search} />
      </div>
      <ListSort />
    </div>
  );
}
