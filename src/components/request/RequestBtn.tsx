'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RequestForm } from '@/components/request/RequestForm';

export function RequestBtn() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Request</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Your Proposal</DialogTitle>
          <DialogDescription>
            This text will be sent with the request to the lessor.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="">
            <RequestForm />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
