'use client';

import React from 'react'; // Explicitly import React
import Image from 'next/image';
import { formatDistance, subDays } from 'date-fns';
import { CircleCheck, CircleCheckBig, Clock, XCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

import { approve } from '@/actions/leasingRequest/approve';
import { reject } from '@/actions/leasingRequest/reject';

interface LeasingRequestCardProps {
  id: string;
  dormName: string;
  dormUrl: string;
  lesseeName: string;
  createAt: string;
  status: string;
  message: string;
}

const LeasingRequestCard: React.FC<LeasingRequestCardProps> = ({
  id,
  dormName,
  dormUrl,
  lesseeName,
  createAt,
  status,
  message,
}) => {
  const { toast } = useToast();

  const showSuccessToast = () => {
    toast({
      description: (
        <div className="flex gap-5">
          <CircleCheckBig className="text-green-500" />
          <p className="text-base">Requested successfully</p>
        </div>
      ),
    });
  };

  const showErrorToast = (error: string) => {
    toast({
      variant: 'destructive',
      title: 'Uh oh! Something went wrong.',
      description: error,
    });
  };

  const handleAccept = async () => {
    const action = await approve(id);
    if ('error' in action) {
      showErrorToast(action.error ?? '');
    } else {
      showSuccessToast();
    }
  };

  const handleDecline = async () => {
    const action = await reject(id);
    if ('error' in action) {
      showErrorToast(action.error ?? '');
    } else {
      showSuccessToast();
    }
  };

  return (
    <div
      className="flex gap-4 p-4 border rounded-lg shadow-md bg-gray-50"
      data-status={status}
    >
      <Image
        src={dormUrl}
        alt={`Image of ${dormName}`}
        width={60}
        height={60}
        className="object-cover rounded-full h-[60px] w-[60px]"
      />

      <div className="flex-1">
        {status === 'PENDING' ? (
          <div
            className={`flex items-center text-xs font-medium px-2 py-1 rounded-full text-yellow-600 bg-yellow-50 border-yellow-200`}
          >
            <Clock className="w-4 h-4 mr-2 text-yellow-600" /> PENDING{' '}
            {formatDistance(subDays(new Date(), 3), new Date(createAt), {
              addSuffix: true,
            })}
          </div>
        ) : status === 'ACCEPT' ? (
          <div
            className={`flex items-center text-xs font-medium px-2 py-1 rounded-full text-green-600 bg-green-50 border-green-200`}
          >
            <CircleCheck className="w-4 h-4 mr-2 text-green-600" /> APPROVED{' '}
            {formatDistance(subDays(new Date(), 3), new Date(createAt), {
              addSuffix: true,
            })}
          </div>
        ) : (
          <div
            className={`flex items-center text-xs font-medium px-2 py-1 rounded-full text-red-600 bg-red-50 border-red-200`}
          >
            <XCircle className="w-4 h-4 mr-2 text-red-600" /> REJECTED{' '}
            {formatDistance(subDays(new Date(), 3), new Date(createAt), {
              addSuffix: true,
            })}
          </div>
        )}

        <CardTitle className="text-lg font-semibold">{dormName}</CardTitle>

        <p className="text-sm text-gray-600 mb-2">Requested by: {lesseeName}</p>

        <p className="text-sm">{message}</p>
      </div>

      {status === 'PENDING' && (
        <div className="flex flex-col gap-2 items-end w-20">
          <Button variant="outline" className="w-full" onClick={handleAccept}>
            Accept
          </Button>
          <Button variant="outline" className="w-full" onClick={handleDecline}>
            Decline
          </Button>
        </div>
      )}
    </div>
  );
};

export { LeasingRequestCard };
