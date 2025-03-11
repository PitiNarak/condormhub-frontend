'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { notiProposal } from '@/components/layout/RequestDetail';
import { mockNotifications } from '@/app/(root)/notification/lessorNoti/mockData/mockNotifications';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';

export function NotificationScroll() {
  const allNoti: notiProposal[] = mockNotifications;
  const [openDialog, setOpenDialog] = useState(false);
  const [currentAction, setCurrentAction] = useState<
    'accept' | 'decline' | null
  >(null);

  const handleConfirm = (action: 'accept' | 'decline') => {
    setCurrentAction(action);
    setOpenDialog(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <ScrollArea className="h-[510px] w-full">
        <div className="grid grid-cols-1 gap-5">
          {allNoti.map((data) => (
            <div
              key={String(data.requestId)}
              className="flex gap-4 p-4 border rounded-lg shadow-md items-start"
            >
              <Image
                src={'/image.jpeg'} // Adjust path as needed
                alt={`Image of ${data.propName}`}
                width={60}
                height={60}
                className="object-cover rounded-full h-[60px] w-[60px]"
              />
              <div className="flex-1">
                <CardTitle className="text-lg font-semibold">
                  {data.propName}
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Requested by: {data.requestUser}
                </p>
                <p className="text-sm mt-2">{data.proposal}</p>
                <div className="flex justify-end gap-2 mt-2">
                  <Button onClick={() => handleConfirm('accept')}>
                    Accept
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleConfirm('decline')}
                  >
                    Decline
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogTitle>
            {currentAction === 'accept'
              ? 'Are you sure you want to accept?'
              : 'Are you sure you want to decline?'}
          </DialogTitle>
          <DialogFooter>
            <Button onClick={() => setOpenDialog(false)}>Confirm</Button>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
