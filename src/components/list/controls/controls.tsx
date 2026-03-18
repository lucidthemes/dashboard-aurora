import ListControlPagination from './pagination';
import ListControlLimit from './limit';

interface LogsListControlsProps {
  page: number;
  limit: number;
  totalCount: number;
  limitOptions?: number[];
}

export default function ListControls({ page, limit, totalCount, limitOptions }: LogsListControlsProps) {
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="grid grid-cols-1 items-center gap-y-5 self-center sm:grid-cols-2 sm:self-auto lg:grid-cols-[1fr_auto_1fr]">
      <ListControlPagination
        currentPage={page}
        totalPages={totalPages}
        className="justify-self-center sm:justify-self-start lg:col-start-2 lg:justify-self-center"
      />
      <ListControlLimit currentValue={limit} limitOptions={limitOptions} className="justify-self-end lg:col-start-3" />
    </div>
  );
}
