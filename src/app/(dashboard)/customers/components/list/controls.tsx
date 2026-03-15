import { ListControlItemsPerPage, ListControlPagination } from '@/components/list-controls';

interface CustomersListControlsProps {
  page: number;
  limit: number;
  totalCount: number;
}

export default function CustomersListControls({ page, limit, totalCount }: CustomersListControlsProps) {
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="grid grid-cols-1 items-center gap-y-5 self-center sm:grid-cols-2 sm:self-auto lg:grid-cols-[1fr_auto_1fr]">
      <ListControlPagination
        currentPage={page}
        totalPages={totalPages}
        className="justify-self-center sm:justify-self-start lg:col-start-2 lg:justify-self-center"
      />
      <ListControlItemsPerPage currentValue={limit} className="justify-self-end lg:col-start-3" />
    </div>
  );
}
