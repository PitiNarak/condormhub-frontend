import { ReviewCard } from '@/components/dormReveiw-page/reviewCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { getReview } from '@/actions/reviewDorm/getReviewDorm';
import { getDormByID } from '@/actions/dorm/getDormByID';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const dormId = (await params).id;
  const res = await getReview(dormId);
  const dorm = await getDormByID(dormId);

  if (
    res &&
    !('error' in res) &&
    dorm &&
    !('error' in dorm) &&
    res.data?.length != 0
  ) {
    const reviews = res.data;
    return (
      <div className="flex flex-col justify-center items-center gap-10">
        <h1 className="text-center text-5xl font-bold">{dorm.name} Review</h1>
        <Carousel className="w-[1000px]">
          <CarouselContent>
            {reviews!.map((r, index) => (
              <CarouselItem key={index} className="w-full basis-1/2">
                <div className="flex flex-col gap-6 rounded-xl border bg-card shadow px-[10px] py-[30px] relative  mt-5">
                  <ReviewCard
                    historyId={r.historyId}
                    dormId={dormId}
                    message={r.message}
                    rate={r.rate}
                    reviewer={{
                      id: r.reviewer?.id,
                      username: r.reviewer?.username,
                      profilePicUrl: r.reviewer?.profilePicUrl,
                    }}
                    url={r.url}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    );
  } else if (
    res &&
    !('error' in res) &&
    dorm &&
    !('error' in dorm) &&
    res.data?.length === 0
  ) {
    return (
      <div className="h-screen w-screen flex flex-col justify-items-center items-center">
        <h1 className="pt-[100px]">There are no reviews for this dorm yet.</h1>
      </div>
    );
  } else {
    return (
      <div className="h-screen w-screen flex flex-col justify-items-center items-center">
        <h1 className="pt-[100px]">You have to login to see this page</h1>
      </div>
    );
  }
};

export default page;
