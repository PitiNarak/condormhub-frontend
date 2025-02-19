import { Button } from '../ui/button';

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
  return (
    <div key={requestId} className="grid grid-cols-[1fr_2fr_2fr]">
      <div className="text-right">
        <p>{propName}</p>
        <p className="text-xs text-gray-500">{requestUser}</p>
      </div>
      <div className="text-right">
        <Button className="w-20 text-xs md:text-sm ">Accept</Button>
      </div>
      <div className="pl-2">
        <Button variant={'outline'} className="w-20 text-xs md:text-sm">
          Decline
        </Button>
      </div>
    </div>
  );
}
