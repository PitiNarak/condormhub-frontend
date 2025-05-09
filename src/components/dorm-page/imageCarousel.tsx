'use client';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import React from 'react';
import { Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { deleteImage } from '@/actions/editDorm/deleteImage';

export const ImageCarousel = ({ images }: { images: Array<string> }) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const router = useRouter();
  const { data: session } = useSession();
  const pathname = usePathname();
  async function onSubmit(index: number) {
    try {
      const url = images[index];
      images.splice(index, 1);
      if (current == count) {
        setCurrent(current - 1);
      }
      setCount(count - 1);
      if (session?.access_token) {
        await deleteImage(url, session?.access_token);
      }
      router.refresh();
    } catch (e: unknown) {
      console.log(e);
    }
  }

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  React.useEffect(() => {
    setCount(images.length);
  }, [images]);

  return (
    <div className="mx-auto">
      <Carousel setApi={setApi} className="w-[400px] h-[400px]">
        <CarouselContent>
          {images.map((_, index) => (
            <CarouselItem key={index}>
              <Card className="relative">
                <CardContent className="flex aspect-square items-center justify-center p-0">
                  <Image
                    src={images[index]}
                    alt="dorm image"
                    height={400}
                    width={400}
                    className="rounded-xl h-[400px] object-cover"
                  />
                </CardContent>
                {pathname.includes('edit') ||
                pathname.includes('dorm/register') ? (
                  <div>
                    {images.length <= 1 ? (
                      <button className="w-[35px] h-[35px] absolute top-2 right-2 z-10 bg-black/50 rounded-lg justify-center flex items-center">
                        <Trash2 className="text-gray-300 transition-colors" />
                      </button>
                    ) : (
                      <button
                        className="w-[35px] h-[35px] absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/75 rounded-lg justify-center flex items-center"
                        onClick={() => onSubmit(index)}
                      >
                        <Trash2 className="text-gray-300 transition-colors" />
                      </button>
                    )}
                  </div>
                ) : (
                  <div></div>
                )}
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Image {current} of {count}
      </div>
    </div>
  );
};
