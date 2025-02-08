import { auth } from '@/lib/auth';
import { SignOutBtn } from '@/components/auth/signOutBtn';
import { redirect } from 'next/navigation';
import DateNow from '@/components/DateNow';

export default async function SessionPage() {
  const session = await auth();
  if (session) {
    return (
      <div className="container">
        <div>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
        <div>
          <DateNow />
        </div>
        <SignOutBtn />
      </div>
    );
  }
  redirect('/api/auth/signin');
}
