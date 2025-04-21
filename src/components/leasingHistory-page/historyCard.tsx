import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

interface HistoryCardProp {
  dormName: string;
  dormImageUrl: string;
  dormProvince: string;
  dormDistrict: string;
  dormRating: number;
  ownerName: string;
  ownerProfileUrl: string;
  ownerID: string;
  startDate: string;
  endDate: string;
  reviewFlag: boolean;
}

export function HistoryCard({
  dormName,
  dormImageUrl,
  dormProvince,
  dormDistrict,
  dormRating,
  ownerName,
  ownerProfileUrl,
  ownerID,
  startDate,
  endDate,
  reviewFlag,
}: HistoryCardProp) {
  const displayDate =
    startDate === '0001-01-01T00:00:00Z'
      ? ''
      : new Date(startDate).toUTCString().slice(4, 16);

  return (
    <div className="flex gap-4 p-4 border rounded-lg shadow-md items-start bg-gray-50 w-full">
      <Image
        src={dormImageUrl}
        alt={`Image of ${dormName}`}
        width={100}
        height={100}
        className="object-cover rounded-full h-[60px] w-[60px] sm:h-[100px] sm:w-[100px] my-auto"
      />

      <div className="flex-1">
        <div className="flex">
          <p className="text-lg font-semibold flex">
            {dormName} {dormRating}
          </p>
          <p className="text-[17px] pt-0 self-start">&#9733;</p>
        </div>
        <div className="flex">
          <p className="text-sm">
            {dormProvince}, {dormDistrict}
          </p>
        </div>
        <Link className="flex mt-4" href={`/profile/${ownerID}`}>
          <Image
            src={ownerProfileUrl}
            alt={`Image of ${ownerName}`}
            width={40}
            height={40}
            className="object-cover rounded-full  h-[40px] w-[40px] hidden sm:block"
          />
          <p className="text-sm my-auto sm:ml-2">{ownerName}</p>
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-sm text-gray-600 self-start">{displayDate}</p>
        {endDate === '0001-01-01T00:00:00Z' ? (
          <p className="text-end text-yellow-600">Ongoing</p>
        ) : reviewFlag ? (
          <p className="text-end text-green-500">Reviewed</p>
        ) : (
          <div className="text-end">
            <Link href="#">
              <Button>Review</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
