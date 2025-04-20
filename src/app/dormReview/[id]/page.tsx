import { unstable_cache as cache } from 'next/cache';
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
import { auth } from '@/lib/auth';
import { Review } from '@/mocks/mockPropertyReview';

const getAllReview = async (token: string, id: string) => {
  const res = await getReview(token, id);
  return res;
};

// Outside the cached function:
export async function getAllReviewWithAuth(id: string) {
  const session = await auth();
  const token = session?.access_token;
  if (!token) return null;
  return getAllReview(token, id);
}

const getDorm = cache(
  async (id) => {
    const res = await getDormByID(id);
    return res;
  },
  ['dorm-details'],
  { tags: ['dorm-details'] }
);

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const res = await getAllReviewWithAuth(id);
  const dorm = await getDorm(id);

  interface ReviewWithFlag {
    review: Review;
    reviewFlag: boolean;
  }

  let reviews: Review[] = [];

  if (
    res &&
    !('error' in res) &&
    typeof res === 'object' &&
    'data' in res &&
    Array.isArray((res as { data: ReviewWithFlag[] }).data)
  ) {
    reviews = (res as { data: ReviewWithFlag[] }).data
      .filter((e) => e.reviewFlag === true)
      .map((e) => e.review);
  } else {
    console.warn('Unexpected res format:', res);
  }
  if (
    res &&
    !('error' in res) &&
    dorm &&
    !('error' in dorm) &&
    res.data?.length != 0
  ) {
    return (
      <div className="flex flex-col justify-center items-center gap-10">
        <h1 className="text-center text-5xl font-bold">{dorm.name} Review</h1>

        <Carousel className="w-[1000px]">
          <CarouselContent>
            {reviews!.map((r, index) => (
              <CarouselItem key={index} className="w-full basis-1/2">
                <div className="flex flex-col gap-6 rounded-xl border bg-card shadow px-[10px] py-[30px]">
                  <ReviewCard dormId={id} review={r} />
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
        <h1 className="pt-[100px]">There are not review yet.</h1>
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
