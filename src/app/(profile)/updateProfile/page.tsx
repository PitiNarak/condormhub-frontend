import UpdateInformationForm from '@/components/profileSetting/UpdateInformationForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
//import { auth } from '@/lib/auth';
import { cn } from '@/lib/utils';
//import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default async function UpdateProfilePage() {
  //const session = await auth(); //-------------------------------------------------
  //for example to make the ui display
  const session = {
    user: {
      id: 'id',
      name: 'name',
      email: 'email',
    },
    // access_token: 'string',
    // refresh_token: 'string',
    // access_token_expired: 'number',
    expires: 'expires',
  };
  //---------------------------------------------------------------------------------
  if (session != null) {
    return (
      <div className="flex w-full items-center justify-center h-[100vh]">
        <div className="w-full max-w-sm">
          <div className={cn('flex flex-col gap-6')}>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Profile Update</CardTitle>
                <CardDescription>
                  Fill the feild you want to update below,<br></br>you has to
                  fill all the feild to update.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UpdateInformationForm session={session} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  } else {
    //----------------------------------------------------------------------
    redirect('/home');
  }
}
