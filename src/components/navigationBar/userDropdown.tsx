import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { LogoutButton } from '@/components/setting-page/logOutButton';

interface Props {
  name: string;
  avatarUrl?: string;
}

export async function UserDropdown({ name, avatarUrl }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>
            {name.split(' ').map((e) => e.charAt(0))}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/setting" className="w-full">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/dorm/register" className="w-full">
            Domitory
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/rentHistory" className="w-full">
            History
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
