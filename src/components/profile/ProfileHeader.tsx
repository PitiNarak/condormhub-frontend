'use client';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function ProfileHeader() {
  const params = useParams<{ tag: string; item: string }>();

  //const data = fetch(get user from ID)
  const userName = 'Piti';
  const profileURL = '/mockProfile.png';
  const firstName = 'Piti';
  const lastName = 'Narak';
  const universityName = 'Chulalongkorn University';
  const role = 'Lessee';
  const ratingScore = 4.5;
  console.log(params);

  return (
    <div>
      <div className="flex justify-center mx-auto">
        <Image
          src={profileURL}
          alt="userProfile"
          height={200}
          width={200}
          className="object-cover h-[150px] w-[150px] lg:h-[200px] lg:w-[200px] rounded-[50%]"
        />
      </div>
      <div className="text-center">
        <div className="flex justify-center m-auto items-center">
          <p className="text-3xl font-bold">
            {userName}
            <span className="text-sm font-normal ml-2">
              &#40;{ratingScore}&#41;
            </span>
          </p>
        </div>
        <p className="text-gray-600 mb-2">
          {firstName} {lastName}
        </p>
        <p className="text-gray-400 mb-2">{universityName}</p>
        <div className="flex">
          <p className="justify-center mx-auto px-5 py-1 border rounded-2xl bg-gray-100">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
}
