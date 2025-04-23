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
import { auth } from '@/lib/auth';
import { ReportDialog } from '@/components/navigationBar/reportDialog';

interface Props {
  name: string;
  avatarUrl?: string;
}

export async function UserDropdown({ name, avatarUrl }: Props) {
  const session = await auth();
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
          <Link href={`/profile/${session?.user?.id}`} className="w-full">
            Profile
          </Link>
        </DropdownMenuItem>
        {session?.user?.role == 'LESSEE' && (
          <DropdownMenuItem>
            <Link href="/requestHistory">Request History</Link>
          </DropdownMenuItem>
        )}
        {session?.user?.role == 'LESSOR' && (
          <DropdownMenuItem>
            <Link href="/leasingRequest">Leasing Request</Link>
          </DropdownMenuItem>
        )}
        {session?.user?.role == 'ADMIN' && (
          <DropdownMenuItem>
            <Link href="/admin" className="w-full">
              Verification Review
            </Link>
          </DropdownMenuItem>
        )}
        {session?.user?.role == 'LESSEE' && (
          <>
            <DropdownMenuItem>
              <Link href="/leasingHistory" className="w-full">
                History
              </Link>
            </DropdownMenuItem>
            <ReportDialog />
          </>
        )}
        {session?.user?.role == 'ADMIN' && (
          <>
            <DropdownMenuItem>
              <Link href="/admin/support" className="w-full">
                Support
              </Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuItem>
          <Link href="/contractNotification" className="w-full">
            Contract
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
