'use client';
import React from 'react';
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
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { DeleteAccount } from '@/actions/setting/action';

export const DeleteAccountButton = ({
  access_token,
}: {
  access_token: string;
}) => {
  async function onSubmit() {
    const res = await DeleteAccount(access_token);
    if (res?.error) {
      console.log(res.error);
    } else {
      await signOut();
      redirect('/login');
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-min">
          Delete Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="w-min text-nowrap">Warning</DialogTitle>
          <DialogDescription className="text-left">
            This action cannot be undone. Are you sure you want to permanently
            delete this account?
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
