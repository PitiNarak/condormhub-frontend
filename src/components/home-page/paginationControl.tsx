'use client';

import { useSearchParams } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationFirst,
  PaginationLast,
} from '@/components/ui/pagination';

interface PaginationControlProps {
  lastPage: number;
}

export function PaginationControl({ lastPage }: PaginationControlProps) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  // Preserve search parameters and append page
  const createPageLink = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    return `/?${params.toString()}`;
  };

  // Base pagination numbers array
  const numbers = [...Array(5).keys()].slice(0, Math.min(5, lastPage));

  // Offset logic for pagination numbers
  const offset =
    lastPage > 6
      ? currentPage + 2 > lastPage
        ? lastPage - 4
        : Math.max(1, currentPage - 2)
      : 1;

  return (
    <Pagination>
      <PaginationContent>
        {/* First Page */}
        <PaginationItem>
          <PaginationFirst href={createPageLink(1)} />
        </PaginationItem>

        {/* Page Numbers */}
        <div className="flex">
          {numbers.map((pageNumber) => (
            <PaginationItem key={pageNumber.toString()}>
              <PaginationLink
                href={createPageLink(pageNumber + offset)}
                isActive={pageNumber + offset === currentPage}
              >
                {pageNumber + offset}
              </PaginationLink>
            </PaginationItem>
          ))}
        </div>

        {/* Last Page */}
        <PaginationItem>
          <PaginationLast href={createPageLink(lastPage)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
