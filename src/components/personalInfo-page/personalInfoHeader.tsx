'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function PersonalHeader() {
  const { data: session } = useSession();
  const router = useRouter();
  if (!session) {
    router.push('/register');
  }
  return (
    <div>
      <p>Welcome {session?.user?.username || ''}</p>
    </div>
  );
}
