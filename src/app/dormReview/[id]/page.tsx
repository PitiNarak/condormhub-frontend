import { getDormByID } from '@/actions/dorm/getDormByID';
import { mockReview } from '@/mocks/mockPropertyReview';
import { unstable_cache as cache } from 'next/cache';
import { ReviewCard } from '@/components/dormReveiw-page/reviewCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

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
  const res = await getDorm(id);

  let review = mockReview;
  if (res && !('error' in res)) {
    if (res.imagesUrl && res.imagesUrl.length > 0) {
      review = mockReview.map((r) => ({
        ...r,
        image: [...r.image, ...res.imagesUrl!],
      }));
    }
  }

  if (res && !('error' in res)) {
    return (
      <div className="flex flex-col justify-center items-center gap-10">
        <h1 className="text-center text-5xl font-bold">{res.name} Review</h1>

        <Carousel className="w-[1000px]">
          <CarouselContent>
            {review.map((r, index) => (
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
  } else {
    return (
      <div>
        <h1>Error</h1>
      </div>
    );
  }
};

export default page;
