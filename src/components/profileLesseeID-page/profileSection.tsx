import { ProfileHeader } from '@/components/profileLesseeID-page/profileHeader';
import { ProfileInfo } from '@/components/profileLesseeID-page/profileInfo';

export function ProfileSection() {
  return (
    <div className="flex justify-center mx-auto">
      <div className="flex flex-col gap-2 lg:flex-row">
        <div className="flex justify-center mx-auto w-[350px] md:w-[700px] lg:w-[350px]">
          <ProfileHeader />
        </div>
        <ProfileInfo />
      </div>
    </div>
  );
}
