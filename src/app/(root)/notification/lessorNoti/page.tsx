import { LessorNotificationScroll } from '@/app/(root)/notification/lessorNoti/lessorNotificationScroll';

export default function Page() {
  return (
    <div className="">
      <div className="text-center text-3xl font-bold">
        <p>Notification</p>
      </div>
      <div className="pt-7">
        <LessorNotificationScroll />
      </div>
    </div>
  );
}
