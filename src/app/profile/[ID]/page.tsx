import { getProfileByID } from '@/actions/profile/getProfileByID';
import { OwnerPropertyScroll } from '@/components/profileID-page/ownerPropertyScroll';
import { ProfileHeader } from '@/components/profileID-page/profileHeader';
import { ProfileInfo } from '@/components/profileID-page/profileInfo';
import { UnbanDialog } from '@/components/profileID-page/banAndUnbanDialog';
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
    <div>
      {data.banned && (
        <h1 className="text-center p-10 text-red-600 font-bold text-3xl">
          This user is banned
        </h1>
      )}
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
              reviewsAmount={data.review_count ?? 0}
              totalDorms={(data.dorms_leased ?? 0) + (data.dorms_owned ?? 0)}
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
      <div className="flex justify-center gap-10 mt-10">
        <div hidden={session?.user?.id != ID}>
          <Link href="/setting">
            <Button>Edit Profile</Button>
          </Link>
        </div>
        <div
          hidden={session?.user?.role != 'ADMIN' || session?.user?.id === ID}
        >
          <UnbanDialog userId={ID} isBan={data.banned ?? false} />
        </div>
      </div>

      {data.role === 'LESSOR' ? (
        <div>
          <OwnerPropertyScroll
            showIncome={session?.user?.id === ID}
            ownerName={data.username ?? ''}
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
