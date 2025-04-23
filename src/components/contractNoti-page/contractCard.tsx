'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  StarIcon,
  HomeIcon,
  BedIcon,
  BathIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
} from 'lucide-react';
import { signContract } from '@/actions/contract/acceptContract';
import { cancelContract } from '@/actions/contract/cancelContract';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

interface ContractCardProps {
  contractID: string;
  dormName: string;
  dormImageUrl: string;
  dormProvince: string;
  dormDistrict: string;
  dormRating: number;
  dormPrice: number;
  dormSize: number;
  dormBedroom: number;
  dormBathroom: number;
  lesseeName: string;
  lesseeProfileUrl: string;
  lesseeID: string;
  lessorName: string;
  lessorProfileUrl: string;
  lessorID: string;
  lesseeStatus: string;
  lessorStatus: string;
  contractStatus: string;
}

export function ContractCard({
  contractID,
  dormName,
  dormImageUrl,
  dormProvince,
  dormDistrict,
  dormRating,
  dormPrice,
  dormSize,
  dormBedroom,
  dormBathroom,
  lesseeName,
  lesseeProfileUrl,
  lesseeID,
  lessorName,
  lessorProfileUrl,
  lessorID,
  lesseeStatus,
  lessorStatus,
  contractStatus,
}: ContractCardProps) {
  const { data: session } = useSession();
  const userRole = session?.user?.role;
  const [clientStatus, setClientStatus] = useState<string>(
    userRole === 'LESSOR' ? lessorStatus : lesseeStatus
  );

  const getStatusIcon = (status: string) => {
    if (status === 'SIGNED')
      return <CheckCircleIcon className="text-green-500 w-5 h-5" />;
    if (status === 'CANCELED')
      return <XCircleIcon className="text-red-500 w-5 h-5" />;
    return <ClockIcon className="text-yellow-500 w-5 h-5" />;
  };

  const getContractStatusClass = (status: string) => {
    if (status === 'SIGNED') return 'bg-green-100 text-green-800';
    if (status === 'CANCELED') return 'bg-red-100 text-red-800';
    if (status === 'WAITING') return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };
  async function acceptContract() {
    const res = await signContract(contractID);
    if (res?.message) {
      showErrorToast(res.message.error ?? '');
    } else {
      setClientStatus('SIGNED');
    }
  }
  async function rejectContract() {
    const res = await cancelContract(contractID);
    if (res?.message) {
      showErrorToast(res.message.error ?? '');
    } else {
      setClientStatus('CANCEL');
    }
  }
  const { toast } = useToast();
  const showErrorToast = (error: string) => {
    toast({
      variant: 'destructive',
      title: 'Uh oh! Something went wrong.',
      description: error,
    });
  };

  return (
    <div className="rounded-xl shadow-md overflow-hidden bg-white border border-gray-200 max-w-2xl mx-auto">
      <div className="flex flex-col md:flex-row">
        {/* Dorm Image Section */}
        <div className="md:w-1/3 h-48 md:h-auto relative">
          <Image
            src={dormImageUrl || 'https://placehold.co/400'}
            width={400}
            height={400}
            alt={dormName}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-lg shadow flex items-center">
            <StarIcon className="text-yellow-500 w-4 h-4 mr-1" />
            <span className="text-sm font-medium">{dormRating.toFixed(1)}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 md:p-6 md:w-2/3 flex flex-col justify-between">
          {/* Dorm Details */}
          <div>
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {dormName}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getContractStatusClass(contractStatus)}`}
              >
                {contractStatus.charAt(0).toUpperCase() +
                  contractStatus.slice(1)}
              </span>
            </div>

            <p className="text-gray-600 mb-3">
              {dormDistrict}, {dormProvince}
            </p>

            <div className="flex flex-wrap gap-3 mb-4">
              <div className="flex items-center">
                <HomeIcon className="w-4 h-4 text-gray-500 mr-1" />
                <span className="text-sm text-gray-700">{dormSize} m²</span>
              </div>
              <div className="flex items-center">
                <BedIcon className="w-4 h-4 text-gray-500 mr-1" />
                <span className="text-sm text-gray-700">{dormBedroom} bed</span>
              </div>
              <div className="flex items-center">
                <BathIcon className="w-4 h-4 text-gray-500 mr-1" />
                <span className="text-sm text-gray-700">
                  {dormBathroom} bath
                </span>
              </div>
              <div className="text-sm font-semibold text-gray-900">
                ฿{dormPrice.toLocaleString()} / month
              </div>
            </div>
          </div>

          {/* User Details */}
          <div className="border-t border-gray-200 pt-4 mt-2 grid grid-cols-1 sm:grid-cols-2">
            <div className="flex justify-between mb-3">
              <Link href={`/profile/${lesseeID}`}>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <Image
                      src={lesseeProfileUrl || 'https://placehold.co/40'}
                      width={40}
                      height={40}
                      alt={lesseeName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{lesseeName}</p>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {getStatusIcon(lesseeStatus)}
                        <span className="text-xs ml-1 capitalize">
                          {lesseeStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="flex justify-between">
              <Link href={`/profile/${lessorID}`}>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img
                      src={lessorProfileUrl || 'https://placehold.co/40'}
                      width={40}
                      height={40}
                      alt={lessorName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{lessorName}</p>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {getStatusIcon(lessorStatus)}
                        <span className="text-xs ml-1 capitalize">
                          {lessorStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          {clientStatus == 'WAITING' && (
            <div>
              <div className="flex justify-end pt-4 gap-2">
                <Button
                  variant={'outline'}
                  onClick={() => rejectContract()}
                  className="w-20"
                >
                  Cancel
                </Button>
                <Button onClick={() => acceptContract()} className="w-20">
                  Sign
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
