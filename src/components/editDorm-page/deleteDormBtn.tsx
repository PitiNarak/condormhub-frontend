'use client';

import { deleteDorm } from '@/actions/editDorm/deleteDorm';
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

export const DeleteDormBtn = ({
  dormId,
  access_token,
}: {
  dormId: string;
  access_token: string;
}) => {
  async function onSubmit() {
    const res = await deleteDorm(dormId, access_token);
    if (res?.error) {
      console.log(res.error);
    } else {
      redirect('/home/lesseeView');
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-min">
          Delete Dorm
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="w-min text-nowrap">Warning</DialogTitle>
          <DialogDescription className="text-left">
            This action cannot be undone. Are you sure you want to permanently
            delete this dorm?
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
  );
};
