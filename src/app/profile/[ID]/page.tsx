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
  searchParams,
}: {
  params: Promise<{ ID: string }>;
  searchParams: Promise<{ page: string }>;
}) {
  const session = await auth();
  const { ID } = await params;
  const { page } = await searchParams;
  const data = await getProfileByID(ID);
  const dormPage = Number(page ?? 1);

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
      {data.role === 'LESSOR' ? (
        <div>
          <OwnerPropertyScroll
            showIncome={session?.user?.id === ID}
            profileID={ID}
            page={dormPage}
          />
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}
