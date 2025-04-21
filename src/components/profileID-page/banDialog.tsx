'use client';

// import { banUser } from '@/actions/profile/banUser';
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

export const BanDialog = ({ userId }: { userId: string }) => {
  async function onSubmit() {
    console.log(userId);
    // const res = await banUser(userId);
    // if (res?.error) {
    //   console.log(res.error);
    // } else {
    //   redirect('/');
    // }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-min">
          Ban user
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="w-min text-nowrap">Warning</DialogTitle>
          <DialogDescription className="text-left">
            Are you sure you want to ban this user?
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
