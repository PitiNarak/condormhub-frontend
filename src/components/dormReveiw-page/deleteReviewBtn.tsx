'use client';

import { DeleteReview } from '@/actions/reviewDorm/deleteReviewDorm';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { redirect } from 'next/navigation';

export const DeleteReviewBtn = ({
  historyId,
  dormId,
  canDelete,
}: {
  historyId: string;
  dormId: string;
  canDelete: boolean;
}) => {
  async function onSubmit() {
    const res = await DeleteReview(historyId);
    console.log(res);
    if (res?.error) {
      console.log(res.error);
    } else {
      redirect(`/dormReview/${dormId}`);
    }
  }
  if (canDelete) {
    return (
      <div className="absolute -top-5 -right-5">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-10 h-10 bg-red-500 rounded-full">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="w-min text-nowrap">Warning</DialogTitle>
              <DialogDescription className="text-left">
                This action cannot be undone. Are you sure you want to
                permanently delete this review?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex-col md:gap-1 gap-2">
              <Button onClick={onSubmit} variant="destructive">
                Confirm
              </Button>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
};
