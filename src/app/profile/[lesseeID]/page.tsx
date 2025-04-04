import { LesseeReview } from '@/components/profileLesseeID-page/lesseeReviews';
import { ProfileSection } from '@/components/profileLesseeID-page/profileSection';
export default async function page() {
  return (
    <div className="">
      <ProfileSection />
      <div className="flex justify-center mx-auto">
        <LesseeReview />
      </div>
    </div>
  );
}
