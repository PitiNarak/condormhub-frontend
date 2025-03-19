import * as React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  notiProposal,
  RequestDetail,
} from '@/components/navigationBar/notificationRequestDetail';

const mockData = JSON.stringify([
  {
    requestId: '1',
    requestUser: 'User1',
    propName: 'Ideo1',
    proposal: "I'm homelesss",
  },
  {
    requestId: '2',
    requestUser: 'User2',
    propName: 'Ideo2',
    proposal: 'Please I really want this place',
  },
  {
    requestId: '3',
    requestUser: 'User3',
    propName: 'Ideo3',
    proposal: 'Oh god please say yes',
  },
  {
    requestId: '4',
    requestUser: 'User4',
    propName: 'Ideo4',
    proposal: 'This deal is a steal',
  },
  {
    requestId: '5',
    requestUser: 'User5',
    propName: 'Ideo5',
    proposal: 'I want to open a restaurant',
  },
]);

import { Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function NotiBtn() {
  const allNoti = JSON.parse(mockData);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Bell />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[220px] md:w-[300px] h-[200px]">
        <DropdownMenuLabel>
          Notification
          <span className="ml-1 text-gray-400 font-thin text-xs">
            &#40;Click to read&#41;
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[150px]">
          <div className="grid grid-cols-1 gap-5">
            {allNoti.map((data: notiProposal) => (
              <div key={String(data.requestId)} className="text-sm">
                <RequestDetail
                  requestId={data.requestId}
                  requestUser={data.requestUser}
                  propName={data.propName}
                  proposal={data.proposal}
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
