'use client';
import React from 'react';
import { Button } from '../ui/button';
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

const DeleteAccountButton = () => {
  async function onSubmit() {
    //TODO: implement delete account
    console.log('deleted');
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
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this account?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
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

export default DeleteAccountButton;
