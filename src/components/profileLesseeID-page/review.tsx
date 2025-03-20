import Image from 'next/image';
import { Card } from '@/components/ui/card';

export interface reviewI {
  reviewerID: string;
  reviewDate: string;
  reviewMessage: string;
}

export const ReviewBox = ({
  reviewerID,
  reviewDate,
  reviewMessage,
}: reviewI) => {
  //Fetch lessor data from reviewerID to get the lessor name and profile image
  const reviewerName = 'Piti';
  const profileURL = '/mockProfile.png';
  return (
    <Card className="w-[250px] h-[170px] md:w-[300px] md:h-[200px] relative">
      <div className="p-3">
        <p>{reviewMessage}</p>
      </div>
      <div className="flex absolute bottom-0 right-0 p-2">
        <Image
          src={profileURL}
          alt="User profile"
          height={50}
          width={50}
          className="rounded-[50%]"
        />
        <div className="ml-[5px]">
          <p>
            {reviewerName} &#40;{reviewerID}&#41;
          </p>
          <p className="text-sm">{reviewDate}</p>
        </div>
      </div>
    </Card>
  );
};
