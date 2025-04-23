import { getDormByID } from '@/actions/dorm/getDormByID';
import { ImageCarousel } from '@/components/dorm-page/imageCarousel';
import { AddImageBtn } from '@/components/editDorm-page/addImageBtn';
import { EditDormForm } from '@/components/editDorm-page/editDormForm';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { unstable_cache as cache } from 'next/cache';
import { Divider } from '@/components/navigationBar/divider';
import { DeleteDormBtn } from '@/components/editDorm-page/deleteDormBtn';
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
  const { id } = await params;
  const res = await getDorm(id);
  const session = await auth();

  if (res && !('error' in res)) {
    if (session?.access_token) {
      if (
        (session.user?.role === 'LESSOR' &&
          session.user.id === res.owner?.id) ||
        session.user?.role === 'ADMIN'
      ) {
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
            <AddImageBtn dormId={id} access_token={session.access_token} />

            <div className="flex justify-between lg:w-[1000px] mt-10 sm:w-[90%] w-[1000px]">
              <div className="w-full text-left flex-col flex gap-4 pr-8">
                <EditDormForm
                  dormInfo={res}
                  access_token={session.access_token}
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 lg:w-[1000px] mt-10 sm:w-[90%] w-[1000px]">
              <h1 className="text-2xl pt-3 font-semibold text-red-500">
                Delete dorm
              </h1>
              <Divider className="w-full" />
              <p>
                Once you delete your dorm, there is no going back. Please be
                certain.
              </p>
              <DeleteDormBtn dormId={id} />
            </div>
          </div>
        );
      } else {
        redirect(`/dorm/${res.id}`);
      }
    }
  }
};

export default page;
