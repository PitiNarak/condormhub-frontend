import { RequestScroll } from '@/components/leasingRequest-page/requestScroll';

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center p-10 gap-6">
      <div className="flex flex-col gap-3 max-w-3xl w-full">
        <h1 className="text-3xl pt-3 font-semibold text-center">
          Request History
        </h1>
        <RequestScroll isLessor={false} />
      </div>
    </div>
  );
};

export default page;
