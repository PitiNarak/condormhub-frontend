import Image from 'next/image';

export interface reviewI {
  reviewerID: string;
  reviewDate: string;
  reviewMessage: string;
}

const ReviewBox = ({ reviewerID, reviewDate, reviewMessage }: reviewI) => {
  //Fetch lessor data from reviewerID to get the lessor name and profile image
  const reviewerName = 'Piti';
  const profileURL = '/mockProfile.png';
  return (
    <div className="w-[250px] h-[220px] relative">
      <p>{reviewMessage}</p>
      <div className="flex absolute bottom-0 right-0 pr-[5px]">
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
          <p>{reviewDate}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewBox;
