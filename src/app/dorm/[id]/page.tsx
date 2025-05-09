import { getDormByID } from '@/actions/dorm/getDormByID';
import { getRequestsByDormId } from '@/actions/dorm/getRequestsByDormId';
import { EditDormButton } from '@/components/dorm-page/editDormButton';
import { ImageCarousel } from '@/components/dorm-page/imageCarousel';
import { RequestBtn } from '@/components/dorm-page/requestBtn';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { unstable_cache as cache } from 'next/cache';
import { Image } from 'lucide-react';

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

  const session = await auth();
  let isRequested = false;
  if (session?.access_token && session.user?.role === 'LESSEE') {
    const allRequest = await getRequestsByDormId(id);

    if (allRequest && 'error' in allRequest) {
      redirect('/');
    } else if (allRequest.data && allRequest.data.length > 1) {
      if (
        !(
          allRequest.data[0].status === 'CANCELED' ||
          allRequest.data[0].status === 'REJECT'
        )
      ) {
        isRequested = true;
      }
    }
  }

  if (res && !('error' in res)) {
    return (
      <div className="pt-5 flex flex-col items-center gap-4 pb-5">
        <h1 className="text-center text-5xl font-bold">{res.name}</h1>
        {res.imagesUrl && res.imagesUrl.length > 0 ? (
          <ImageCarousel images={res.imagesUrl} />
        ) : (
          <div className="flex justify-center items-center w-[400px] h-[400px] custom-dashed-border rounded-xl p-6 mb-2 border-gray-300">
            <Image className="text-gray-300 h-12 w-12" />
          </div>
        )}

        <div className="flex justify-between lg:w-[1000px] mt-10 sm:w-[90%] w-[1000px]">
          <div className="w-[80%] text-left flex-col flex gap-4 pr-8">
            <EditDormButton
              dormOwnerID={res.owner?.id}
              session={session}
              dormID={res.id}
            />
            <p className="text-xl">
              {res.address?.subdistrict}, {res.address?.district},{' '}
              {res.address?.province}, {res.address?.zipcode}
            </p>
            <p>
              {res.bedrooms} bedroom, {res.bathrooms} bathroom | size:{' '}
              {res.size} m<sup>2</sup>
            </p>
            <div className="flex border-2 rounded-lg w-[50%] justify-between p-5">
              <div className="flex flex-row w-[50%] gap-3">
                <p className="pt-2 pl-2">{res.rating}</p>
                <div className="rating rating-half rating-xl bg-yellow pt-1 ">
                  {[1, 2, 3, 4, 5].map((value) => {
                    const rating = res.rating!;
                    const isFull = rating >= value;
                    const isHalf = rating >= value - 0.5 && rating < value;
                    return (
                      <input
                        key={value}
                        type="radio"
                        name={`rating-${res.id}-${Math.random()}`}
                        value={value}
                        checked={isFull || isHalf}
                        className={`mask mask-star ${isFull ? 'mask-half-3 bg-yellow-400' : isHalf ? 'mask-half-1 bg-yellow-400' : 'bg-gray-300'}`}
                        aria-label={`${value} star`}
                        readOnly
                      />
                    );
                  })}
                </div>
              </div>
              <Button>
                <Link href={`/dormReview/${id}`}>Reviews</Link>
              </Button>
            </div>
            <div className="gap-2 flex-col flex">
              <h2 className="font-bold">Hosted By</h2>
              <Link href={`/profile/${res.owner?.id}`} className="w-min">
                <p className="hover:underline">{res.owner?.username}</p>
              </Link>
            </div>
            <div className="gap-2 flex-col flex">
              <h2 className="font-bold">Description</h2>
              <p>{res.description}</p>
            </div>
          </div>
          <div className="w-[20%] h-min text-center border-2 rounded-lg p-5 flex flex-col gap-6">
            <div>
              <h2 className="font-bold text-2xl">Price</h2>
              <p className="text-xl">฿{res.price?.toLocaleString()}</p>
            </div>
            {session?.user?.role === 'LESSEE' && !isRequested ? (
              <RequestBtn dormId={id} />
            ) : (
              session?.user?.role === 'LESSEE' &&
              isRequested && <Button disabled>Requested</Button>
            )}
            {!session?.access_token && (
              <Link href={'/login'}>
                <Button>Request</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default page;
