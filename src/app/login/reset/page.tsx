import { SendResetEmail } from '@/components/login-page/emailFormToResetPassword';
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

export default async function EmailToResetPasswordPage() {
  const session = await auth();
  if (session?.access_token) {
    redirect('/');
  } else {
    return (
      <div className="flex w-full items-center justify-center">
        <div className="w-full max-w-sm pt-14 mx-4">
          <div className={cn('flex flex-col gap-6')}>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Password Reset</CardTitle>
                <CardDescription>
                  Enter your email below,<br></br>we&apos;ll send a link to
                  reset your password.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SendResetEmail />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
