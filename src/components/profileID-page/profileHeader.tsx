import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Check, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface ProfileHeaderProps {
  userName: string;
  profileURL: string;
  role: string;
  isVerified: boolean;
  reviewsAmount: number;
  totalDorms: number;
}

export function ProfileHeader({
  userName,
  profileURL,
  role,
  isVerified,
  reviewsAmount,
  totalDorms,
}: ProfileHeaderProps) {
  const verificationIcon = isVerified ? (
    <Check color="green" />
  ) : (
    <X color="red" />
  );
  return (
    <div>
      <Card className="flex w-[350px] h-[225px] rounded-3xl border-[1px] shadow-lg">
        <div className="w-[225px] h-[225px] mt-3">
          <div className="flex justify-center mx-auto">
            <Image
              src={profileURL}
              alt="userProfile"
              height={100}
              width={100}
              className="object-cover h-[100] w-[100]  rounded-[50%]"
            />
          </div>
          <div className="flex justify-center mx-auto">
            <div className="text-center">
              <p className="text-lg font-bold mt-2">{userName}</p>
              <p className="justify-center mx-auto px-5 py-1 border rounded-2xl bg-gray-100 mt-1">
                {role}
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="pt-4 pb-3">
            <div className="flex">{verificationIcon}</div>
            <p className="text-xs">Verified User</p>
          </div>
          <Separator orientation="horizontal" />
          {role === 'LESSOR' ? (
            <div>
              <div className="py-3">
                <div className="flex">
                  <p className="text-xl font-bold mr-1">{reviewsAmount}</p>
                </div>
                <p className="text-xs">Reviews</p>
              </div>
              <Separator orientation="horizontal" />
            </div>
          ) : (
            <div />
          )}
          <div className="pt-3 pb-4">
            <div className="flex">
              <p className="text-xl font-bold mr-1">{totalDorms}</p>
            </div>
            <p className="text-xs">
              Dorms{role === 'LESSOR' ? ' Owned' : ' Rented'}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
