import { auth } from '@/lib/auth';
import ChangeEmailDialog from '@/components/profileSetting/ChangeEmailDialog';
import UpdateInformationForm from '@/components/profileSetting/UpdateInformationForm';
import { redirect } from 'next/navigation';
import Divider from '@/components/layout/Divider';
import VerificationStatus from '@/components/profileSetting/VerificationStatus';
import DeleteAccountButton from '@/components/profileSetting/DeleteAccountButton';

const page = async () => {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }
  return (
    <div className="flex flex-col justify-center items-center p-10 gap-6">
      <div className="flex flex-col gap-3 max-w-3xl w-full">
        <h1 className="text-3xl pt-3 font-semibold">Profile Settings</h1>
        <Divider className="max-w-3xl w-full" />
      </div>
      <div className="flex flex-col min-w-96 gap-y-1 w-full max-w-3xl">
        <div className="flex gap-3">
          <h2 className="font-semibold">Email</h2>
          <VerificationStatus />
        </div>
        <div className="flex items-center gap-10 w-full">
          <p>{session?.user.email}</p>
          <ChangeEmailDialog />
        </div>
      </div>
      <UpdateInformationForm session={session} />
      <div className="flex flex-col gap-3 max-w-3xl w-full">
        <h1 className="text-2xl pt-3 font-semibold text-red-500">
          Delete account
        </h1>
        <Divider className="max-w-3xl w-full" />
        <p>
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <DeleteAccountButton />
      </div>
    </div>
  );
};
export default page;
