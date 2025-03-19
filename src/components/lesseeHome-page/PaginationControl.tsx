'use client';

import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationControlProps {
  numberCurrent: number;
}

//const PaginationControl: React.FC<PaginationControlProps> = ({ numberCurrent }) => {
const PaginationControl = ({ numberCurrent }: PaginationControlProps) => {
  const lesseePagePath = '/home/lesseeView/';
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get('page') ?? '1';
  function prev() {
    router.push(`${lesseePagePath}?page=${Number(page) - 1}`);
  }
  function next() {
    router.push(`${lesseePagePath}?page=${Number(page) + 1}`);
  }

  return (
    <div className="flex justify-center mx-auto gap-5">
      <Button
        className="text-lg"
        onClick={() => prev()}
        disabled={page === '1'}
      >
        Prev
      </Button>
      <Button
        className="text-lg"
        onClick={() => next()}
        disabled={numberCurrent < 12}
      >
        Next
      </Button>
    </div>
  );
};
export default PaginationControl;
