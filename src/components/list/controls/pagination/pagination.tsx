'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import useListControlPagination from './use-pagination';
import ListControlPaginationNumbers from './numbers';

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

  const pageLimit = 10;

  return (
    <Pagination className={`mx-0 w-auto ${className}`}>
      <PaginationContent className="flex-wrap">
        {currentPage && currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={() => handlePreviousPage()} className="cursor-pointer" />
          </PaginationItem>
        )}

        {totalPages <= pageLimit ? (
          <ListControlPaginationNumbers
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        ) : (
          <>
            <PaginationItem key={1}>
              <PaginationLink
                onClick={() => handlePageChange(1)}
                className="cursor-pointer"
                isActive={Number(currentPage) === 1}
              >
                {1}
              </PaginationLink>
            </PaginationItem>

            {Number(currentPage) > 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <ListControlPaginationNumbers
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              totalPages={totalPages}
              pageLimitExceeded={true}
              pageLimit={pageLimit}
            />

            {Number(currentPage) < totalPages - (pageLimit - 2) && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem key={totalPages}>
              <PaginationLink
                onClick={() => handlePageChange(totalPages)}
                className="cursor-pointer"
                isActive={Number(currentPage) === totalPages}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {currentPage && totalPages && currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext onClick={() => handleNextPage()} className="cursor-pointer" />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
