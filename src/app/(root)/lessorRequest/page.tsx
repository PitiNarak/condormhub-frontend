import { RequestScroll } from '@/app/(root)/lessorRequest/RequestScroll';

export default function Page() {
  return (
    <div className="">
      <div className="text-center text-3xl font-bold">
        <p>Property Requests</p>
      </div>
      <div className="pt-7">
        <RequestScroll />
      </div>
    </div>
  );
}
