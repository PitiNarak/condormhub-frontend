'use client';
import { Button } from '@/components/ui/button';
import { Session } from 'next-auth';
// import { redirect } from "next/navigation"

export const EditDormButton = ({
  dormOwnerID,
  session,
}: {
  dormOwnerID: string | undefined;
  session: Session | null;
}) => {
  if (session?.access_token) {
    console.log(session?.access_token);
    if (
      (session.user?.role === 'LESSOR' || session.user?.role === 'ADMIN') &&
      session.user.id === dormOwnerID
    ) {
      function onSubmit() {}
      return (
        <Button className="w-min" onClick={onSubmit}>
          Edit
        </Button>
      );
    }
  }
  return null;
};
