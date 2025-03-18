'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import { MockRequests } from '@/mocks/mockRequests';

export function RequestScroll() {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentAction, setCurrentAction] = useState<
    'accept' | 'decline' | null
  >(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [notifications, setNotifications] = useState(MockRequests);

  const handleConfirm = (action: 'accept' | 'decline', index: number) => {
    setCurrentAction(action);
    setSelectedIndex(index);
    setOpenDialog(true);
  };

  const handleDelete = () => {
    if (selectedIndex !== null) {
      setNotifications((prev) => prev.filter((_, i) => i !== selectedIndex));
      setOpenDialog(false);
      setSelectedIndex(null);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <ScrollArea className="w-full">
        <div className="grid grid-cols-1 gap-5">
          {notifications.map((data, index) => (
            <div
              key={index}
              className="flex gap-4 p-4 border rounded-lg shadow-md bg-gray-50"
            >
              <Image
                src={'/image.jpeg'}
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
              </div>
              {/* Buttons aligned to the right */}
              <div className="flex flex-col gap-2 items-end w-20">
                <Button
                  variant="outline"
                  className="w-full border-green-600 text-green-600 hover:bg-green-50"
                  onClick={() => handleConfirm('accept', index)}
                >
                  Accept
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-red-600 text-red-600 hover:bg-red-50"
                  onClick={() => handleConfirm('decline', index)}
                >
                  Decline
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogTitle className="font-normal">
            {currentAction === 'accept'
              ? 'Are you sure you want to accept?'
              : 'Are you sure you want to decline?'}
          </DialogTitle>
          <DialogFooter>
            <Button onClick={handleDelete}>Confirm</Button>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
