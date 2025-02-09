import { auth } from '@/lib/auth';
import { SignOutBtn } from '@/components/example/signOutBtn';
import Link from 'next/link';

export default async function SessionPage() {
  const session = await auth();
  if (session) {
    return (
      <div className="container">
        <div>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
        <SignOutBtn />
      </div>
    );
  } else {
    return (
      <div className="container">
        <pre>You are not login</pre>
        <Link
          href={'/api/auth/signin'}
          className="h-9 px-4 py-2 bg-primary text-primary-foreground shadow hover:bg-primary/90 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
        >
          Click To SignIn
        </Link>
      </div>
    );
  }
}
