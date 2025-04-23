import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';

interface VerificationCardProps {
  id: string;
  evidenceUrl: string;
  firstname: string;
  lastname: string;
  username: string;
}

export function VerificationCard({
  id,
  evidenceUrl,
  firstname,
  lastname,
  username,
}: VerificationCardProps) {
  return (
    <Card className="w-full rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition min-h-[350px]">
      <CardContent className="px-6 py-5 flex flex-col gap-4 h-full">
        {/* Image with Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <div className="w-full aspect-[3/2] relative rounded-lg overflow-hidden mb-4 cursor-pointer">
              <Image
                src={evidenceUrl || 'https://placehold.co/300x200'}
                alt="Verification Evidence"
                fill
                className="object-cover"
              />
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogTitle></DialogTitle>
            <div className="aspect-[3/2] relative w-full h-full">
              <Image
                src={evidenceUrl || 'https://placehold.co/300x200'}
                alt="Verification Evidence"
                fill
                className="object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>

        {/* Info */}
        <div className="space-y-2">
          <Link href={`/profile/${id}`} className="inline-block">
            <p
              className="text-l font-semibold text-gray-800 truncate hover:underline"
              title={`${firstname} ${lastname}`}
            >
              {firstname} {lastname}
            </p>
          </Link>
          <p
            className="text-sm text-muted-foreground truncate"
            title={username}
          >
            <span className="font-medium">Username:</span> {username}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex justify-between gap-2 mt-2">
          <Button variant="outline" size="sm" className="w-full max-w-[120px]">
            Reject
          </Button>
          <Button
            variant="default"
            size="sm"
            className="w-full max-w-[120px] bg-black text-white"
          >
            Verify
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
