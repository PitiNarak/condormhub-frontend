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
import { LesseeMockNotifications } from '@/app/(root)/notification/lesseeNoti/mockData/mockNotifications';

export function LesseeNotificationScroll() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [notifications, setNotifications] = useState(LesseeMockNotifications);

  const handleConfirm = (index: number) => {
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
              className="flex gap-4 p-4 border rounded-lg shadow-md items-start bg-green-50"
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
                  Lease Completed
                </CardTitle>
                <p className="text-sm">Property: {data.propName}</p>
                <p className="text-sm">Owner: {data.propOwner}</p>
                <p className="text-sm mt-2 text-gray-600">
                  Completed on: {data.date}
                </p>
                <div className="flex justify-end gap-2 mt-2">
                  <Button
                    variant="outline"
                    className="text-green-600 border-green-600 hover:bg-green-50"
                    onClick={() => handleConfirm(index)}
                  >
                    Mark as Read
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogTitle className="font-normal">
            Are you sure you want to mark this as read?
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
