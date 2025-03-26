import { LoginForm } from '@/components/login-page/loginForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { auth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();
  if (session?.access_token) {
    redirect('/');
  }

  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full max-w-sm pt-14 mx-4">
        <div className={cn('flex flex-col gap-6')}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
