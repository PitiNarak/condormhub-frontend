import { LesseeReview } from '@/components/profile/LesseeReviews';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileInfo from '@/components/profile/ProfileInfo';
export default function page() {
  return (
    <div className="">
      <div className="flex justify-center mx-auto">
        <div className="flex flex-col gap-2 lg:flex-row">
          <div className="flex justify-center mx-auto w-[350px] md:w-[700px] lg:w-[350px]">
            <ProfileHeader />
          </div>
          <ProfileInfo />
        </div>
      </div>
      <div className="flex justify-center mx-auto">
        <LesseeReview />
      </div>
    </div>
  );
}
