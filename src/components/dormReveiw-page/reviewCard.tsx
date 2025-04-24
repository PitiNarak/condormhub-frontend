import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { ImageCarousel } from '../dorm-page/imageCarousel';
import { auth } from '@/lib/auth';
import { DeleteReviewBtn } from './deleteReviewBtn';

export async function ReviewCard({
  dormId,
  historyId,
  message,
  rate,
  reviewer,
  url,
}: {
  dormId: string;
  historyId?: string;
  createAt?: string;
  message?: string;
  rate?: number;
  reported?: boolean;
  reviewer?: {
    id?: string;
    username?: string;
    profilePicUrl?: string;
  };
  url?: string[];
}) {
  const session = await auth();
  const canDelete =
    !!session?.access_token &&
    ((session?.user?.role === 'LESSEE' && session.user?.id === reviewer?.id) ||
      session?.user?.role === 'ADMIN');

  return (
    <div className="flex flex-col justify-center items-center">
      <DeleteReviewBtn
        historyId={historyId!}
        dormId={dormId}
        canDelete={canDelete}
      ></DeleteReviewBtn>
      <div className="scale-[80%]">
        <ImageCarousel images={url!} />
      </div>
      <div className="w-full flex flex-col px-3 gap-y-1">
        <div className="flex flex-row items-center justify-items-start gap-2 w-full">
          <Avatar>
            <AvatarImage src={reviewer?.profilePicUrl} />
            <AvatarFallback className="flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-semibold w-8 h-8">
              {reviewer?.username
                ?.split(' ')
                .map((e) => e.charAt(0))
                .join('')}
            </AvatarFallback>
          </Avatar>

          <h1 className="font-semibold justify-self-start">
            {reviewer?.username}
          </h1>
        </div>
        <div className="flex justify-start w-[100px]">
          <div className="w-full rating rating-xl bg-yellow gap-1 text-left">
            {[1, 2, 3, 4, 5].map((value) => (
              <input
                key={value}
                type="radio"
                name={`rating-${dormId}-${Math.random()}`}
                value={value}
                checked={rate === value}
                className="mask mask-star bg-yellow-400 "
                aria-label={`${value} star`}
                readOnly
              />
            ))}
          </div>
        </div>

        <div className="flex h-24 overflow-scroll border border-input px-1 py-2 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-md w-full rounded-lg bg-background pl-5">
          <h1>{message}</h1>
        </div>
      </div>
    </div>
  );
}
