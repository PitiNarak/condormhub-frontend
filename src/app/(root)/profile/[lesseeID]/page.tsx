import LesseeReview from '@/components/profile/LesseeReviews';
import ProfileHeader from '@/components/profile/ProfileHeader';
export default function page() {
  return (
    <div className="">
      <div className="flex justify-center mx-auto">
        <ProfileHeader />
      </div>
      <div>
        <LesseeReview />
      </div>
    </div>
  );
}
