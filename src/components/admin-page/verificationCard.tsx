'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { rejectLessee, verifyLessee } from '@/actions/admin/verifyStudent';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const [openReject, setOpenReject] = React.useState(false);
  const [openVerify, setOpenVerify] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleReject = async () => {
    setLoading(true);
    await rejectLessee(id);
    setLoading(false);
    setOpenReject(false);
    router.refresh();
  };

  const handleVerify = async () => {
    setLoading(true);
    await verifyLessee(id);
    setLoading(false);
    setOpenVerify(false);
    router.refresh();
  };

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

        {/* Action Buttons with Dialogs */}
        <div className="flex justify-between gap-2 mt-2">
          {/* Reject Dialog */}
          <Dialog open={openReject} onOpenChange={setOpenReject}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="w-full max-w-[120px]"
              >
                Reject
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This will reject the user&apos;s verification request.
              </DialogDescription>
              <DialogFooter>
                <Button
                  variant="ghost"
                  onClick={() => setOpenReject(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={handleReject}
                  disabled={loading}
                >
                  {loading ? 'Rejecting...' : 'Reject'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Verify Dialog */}
          <Dialog open={openVerify} onOpenChange={setOpenVerify}>
            <DialogTrigger asChild>
              <Button
                variant="default"
                size="sm"
                className="w-full max-w-[120px] bg-black text-white"
              >
                Verify
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This will approve the user&apos;s verification request.
              </DialogDescription>
              <DialogFooter>
                <Button
                  variant="ghost"
                  onClick={() => setOpenVerify(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button onClick={handleVerify} disabled={loading}>
                  {loading ? 'Verifying...' : 'Verify'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
