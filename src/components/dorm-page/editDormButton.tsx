'use client';
import { buttonVariants } from '@/components/ui/button';
import { Session } from 'next-auth';
import Link from 'next/link';

export const EditDormButton = ({
  dormOwnerID,
  session,
  dormID,
}: {
  dormOwnerID: string | undefined;
  session: Session | null;
  dormID: string | undefined;
}) => {
  if (session?.access_token) {
    if (
      (session.user?.role === 'LESSOR' && session.user?.id === dormOwnerID) ||
      session.user?.role === 'ADMIN'
    ) {
      return (
        <Link
          href={`/dorm/${dormID}/edit`}
          className={buttonVariants({ variant: 'default', className: 'w-min' })}
        >
          Edit
        </Link>
      );
    }
  }
  return null;
};
