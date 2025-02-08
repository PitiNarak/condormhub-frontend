import { LoginForm } from '@/components/login-form';
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

export default async function Page({
  className,
}: React.ComponentPropsWithoutRef<'div'>) {
  const session = await auth();
  if (session) {
    redirect('/home');
  } else {
    return (
      <div className="flex w-full items-center justify-center h-[100vh]">
        <div className="w-full max-w-sm">
          <div className={cn('flex flex-col gap-6', className)}>
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
}
