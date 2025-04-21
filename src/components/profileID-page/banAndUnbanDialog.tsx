'use client';

import { banUser } from '@/actions/profile/banUser';
import { unbanUser } from '@/actions/profile/unbanUser';
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
import { useToast } from '@/hooks/use-toast';
import { CircleCheckBig } from 'lucide-react';
import { useState } from 'react';

export const UnbanDialog = ({
  userId,
  isBan,
}: {
  userId: string;
  isBan: boolean;
}) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  async function onSubmit() {
    const res = isBan ? await unbanUser(userId) : await banUser(userId);

    if (res?.error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: res.error,
      });
    } else {
      toast({
        description: (
          <div className="flex gap-5">
            <CircleCheckBig className="text-green-500" />
            {isBan ? (
              <p className="text-base">Un-ban successfully</p>
            ) : (
              <p className="text-base">ban successfully</p>
            )}
          </div>
        ),
      });
      setOpen(false);
    }
  }
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-min">
          {isBan ? <p>Un-ban user</p> : <p>Ban user</p>}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="w-min text-nowrap">Warning</DialogTitle>
          <DialogDescription className="text-left">
            {isBan ? (
              <p>Are you sure you want to un-ban this user?</p>
            ) : (
              <p>Are you sure you want to ban this user?</p>
            )}
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
