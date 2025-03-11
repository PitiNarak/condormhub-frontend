import { NotificationScroll } from '@/app/(root)/notification/NotificationScroll';

export default function Page() {
  return (
    <div className="">
      <div className="text-center text-3xl font-bold">
        <p>Notification</p>
      </div>
      <div className="pt-7">
        <NotificationScroll />
      </div>
    </div>
  );
}
