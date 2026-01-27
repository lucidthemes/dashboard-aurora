'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { Field, FieldLabel } from '@/components/ui/field';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

function ListControlItemsPerPage({
  currentValue = 12,
  itemOptions = [6, 12, 18, 24],
  label = 'Items per page',
  className,
}: {
  currentValue: number;
  itemOptions?: number[];
  label?: string;
  className?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onRowValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('limit', value);

    if (params.has('page')) {
      params.set('page', '1');
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <Field orientation="horizontal" className={`w-fit ${className}`}>
      <FieldLabel htmlFor="select-items-per-page">{label}</FieldLabel>
      <Select defaultValue={currentValue?.toString()} onValueChange={(value) => onRowValueChange(value)}>
        <SelectTrigger className="w-20 cursor-pointer" id="select-items-per-page">
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="start">
          <SelectGroup>
            {itemOptions.map((option, index) => (
              <SelectItem key={index} value={option.toString()} className="cursor-pointer">
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  );
}

function ListControlPagination({
  currentPage,
  totalPages,
  className,
}: {
  currentPage: number;
  totalPages: number;
  className?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());

    router.push(`?${params.toString()}`);
  };

  const handlePreviousPage = () => {
    const updatedPage = Number(currentPage) - 1;
    handlePageChange(updatedPage);
  };

  const handleNextPage = () => {
    const updatedPage = Number(currentPage) + 1;
    handlePageChange(updatedPage);
  };

  return (
    <Pagination className={`mx-0 w-auto ${className}`}>
      <PaginationContent>
        {currentPage && currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={() => handlePreviousPage()} className="cursor-pointer" />
          </PaginationItem>
        )}
        {[...Array(totalPages)].map((_, i) => {
          const totalPageNumber = i + 1;
          const isActive = Number(currentPage) === Number(totalPageNumber) ? true : false;
          return (
            <PaginationItem key={i + 1}>
              <PaginationLink onClick={() => handlePageChange(i + 1)} className="cursor-pointer" isActive={isActive}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        {currentPage && totalPages && currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext onClick={() => handleNextPage()} className="cursor-pointer" />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

export { ListControlItemsPerPage, ListControlPagination };
