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

//const PaginationControl: React.FC<PaginationControlProps> = ({ numberCurrent }) => {
const PaginationControl = ({ lastPage }: PaginationControlProps) => {
  const lesseePagePath = '/home/lesseeView?page=';
  const searchParams = useSearchParams();
  const numbers = [...Array(5).keys()].slice(0, Math.min(5, lastPage));

  const page = Number(searchParams.get('page') ?? '1');
  const offset =
    lastPage > 6
      ? page + 2 > lastPage
        ? lastPage - 4
        : Math.max(1, page - 2)
      : 1;

  console.log(numbers);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationFirst href={lesseePagePath + '1'} />
        </PaginationItem>
        <div className="flex">
          {numbers.map((pageNumber: number) => (
            <div key={pageNumber.toString()}>
              <PaginationItem>
                <PaginationLink
                  href={lesseePagePath + (pageNumber + offset).toString()}
                  isActive={pageNumber + offset == page}
                >
                  {pageNumber + offset}
                </PaginationLink>
              </PaginationItem>
            </div>
          ))}
        </div>
        <PaginationItem>
          <PaginationLast href={lesseePagePath + lastPage.toString()} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
export default PaginationControl;
