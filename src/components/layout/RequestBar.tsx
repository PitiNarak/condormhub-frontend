import Image from 'next/image';
export interface notification {
  requestId: string;
  requestUser: string;
  propName: string;
}

export default function RequestBar({
  requestId,
  requestUser,
  propName,
}: notification) {
  console.log(requestId);
  return (
    <div className="grid grid-cols-[1fr_1fr_2fr]">
      <div className="justify-center m-auto">
        <Image
          src="/image.jpeg"
          alt="This is user profile image which will request late using user id"
          width={50}
          height={50}
          className="object-cover rounded-3xl h-[30] w-[30]"
        ></Image>
      </div>
      <div className="text-left">
        <p>{propName}</p>
        <p className="text-xs text-gray-500">{requestUser}</p>
      </div>
      <div className="content-center text-right pr-4">
        <p className="text-xs text-gray-400">17 Dec 2024</p>
      </div>
    </div>
  );
}
