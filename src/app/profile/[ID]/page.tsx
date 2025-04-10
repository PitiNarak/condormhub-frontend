import { getProfileByID } from '@/actions/profile/getProfileByID';
import { OwnerPropertyScroll } from '@/components/lessorDashboard-page/ownerPropertyScroll';
import { ProfileHeader } from '@/components/profileID-page/profileHeader';
import { ProfileInfo } from '@/components/profileID-page/profileInfo';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function page({
  params,
}: {
  params: Promise<{ ID: string }>;
}) {
  const session = await auth();
  const { ID } = await params;
  const data = await getProfileByID(ID);
  const { dormPage } = { dormPage: '1' };
  const page = Number(dormPage);

  if ('message' in data) {
    redirect('/');
  }
  return (
    <div className="">
      <div className="flex justify-center mx-auto">
        <div className="flex flex-col gap-2 lg:flex-row">
          <div className="flex justify-center mx-auto w-[350px] md:w-[700px] lg:w-[350px]">
            <ProfileHeader
              userName={data.username ?? ''}
              profileURL={
                data.profilePicUrl
                  ? data.profilePicUrl
                  : 'https://placehold.co/100'
              }
              role={data.role ?? ''}
              isVerified={data.isVerified ?? false}
              reviewsAmount={5}
              totalRenting={5}
            />
          </div>
          <ProfileInfo
            birthDate={data.birthDate ?? ''}
            createAt={data.createAt ?? ''}
            email={data.email ?? ''}
            firstName={data.firstname ?? ''}
            lastName={data.lastname ?? ''}
            userName={data.username ?? ''}
            gender={data.gender ?? ''}
            life1={data.lifestyles ? (data.lifestyles[0] ?? '') : 'Error'}
            life2={data.lifestyles ? (data.lifestyles[1] ?? '') : 'Error'}
            life3={data.lifestyles ? (data.lifestyles[2] ?? '') : 'Error'}
          />
        </div>
      </div>
      {/* <div className="flex justify-center mx-auto">
        <LesseeReview ID={ID} />
      </div> */}
      <div hidden={session?.user?.id != ID} className="text-center mt-[20px]">
        <Link href="/setting">
          <Button>Edit Profile</Button>
        </Link>
      </div>
      {session?.user?.role === 'LESSOR' ? (
        <div>
          <div className="flex flex-col justify-center items-center p-10 gap-6">
            <div className="flex flex-col gap-3 max-w-3xl w-full">
              <h1 className="text-3xl pt-3 font-semibold text-center">
                Lessor Property Dashboard
              </h1>
            </div>
          </div>
          <OwnerPropertyScroll
            showIncome={session.user.id === ID}
            page={page}
            profileID={ID}
          />
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}
