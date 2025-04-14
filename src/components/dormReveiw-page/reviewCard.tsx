import { Review } from '@/mocks/mockPropertyReview';
import { ImageCarousel } from '../dorm-page/imageCarousel';

export function ReviewCard({
  dormId,
  review,
}: {
  dormId: string;
  review: Review;
}) {
  return (
    <div className="flex flex-col gap-3 justify-center items-center">
      <div className="scale-[80%]">
        <ImageCarousel images={review.image} />
      </div>
      <div>
        <div className="rating rating-xl bg-yellow gap-3 pb-3">
          {[1, 2, 3, 4, 5].map((value) => (
            <input
              key={value}
              type="radio"
              name={`rating-${dormId}-${Math.random()}`}
              value={value}
              checked={review.rate === value}
              className="mask mask-star bg-yellow-400 "
              aria-label={`${value} star`}
              readOnly
            />
          ))}
        </div>
      </div>
      <div className="flex h-24 overflow-scroll border border-input px-1 py-2 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-md w-full rounded-lg bg-background pl-5">
        <h1>{review.message}</h1>
      </div>
    </div>
  );
}
