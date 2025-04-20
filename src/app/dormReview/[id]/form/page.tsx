import { ReviewForm } from '@/components/dormReveiw-page/reviewForm';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  return (
    <div className="pt-5 flex flex-col justify-center items-center gap-10 pb-5">
      <h1 className="text-center text-5xl font-bold">Review</h1>
      <div className="flex flex-col gap-6  rounded-xl border bg-card shadow px-[100px] py-[80px]">
        <div>
          <ReviewForm historyId={id}></ReviewForm>
        </div>
      </div>

      <div className="flex justify-between lg:w-[1000px] mt-10 sm:w-[90%] w-[1000px]">
        <div className="w-[80%] text-left flex-col flex gap-4 pr-8"></div>
      </div>
    </div>
  );
};

export default page;
