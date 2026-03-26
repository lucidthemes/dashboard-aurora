'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import useListControlPagination from './use-pagination';

export default function ListControlPagination({
  currentPage,
  totalPages,
  className,
}: {
  currentPage: number;
  totalPages: number;
  className?: string;
}) {
  const { handlePageChange, handlePreviousPage, handleNextPage } = useListControlPagination(currentPage);

  if (totalPages === 0) return null;

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
