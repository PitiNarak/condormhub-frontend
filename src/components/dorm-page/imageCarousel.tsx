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
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { deleteDorm } from '@/actions/editDorm/deleteDorm';

export const ImageCarousel = ({ images }: { images: Array<string> }) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const router = useRouter();
  async function onSubmit(index: number) {
    try {
      const url = images[index];
      images.splice(index, 1);
      if (current == count) {
        setCurrent(current - 1);
      }
      setCount(count - 1);
      deleteDorm(url);
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
                <div>
                  <button
                    className="w-[25px] h-[25px] absolute top-2 right-2 z-10"
                    onClick={() => onSubmit(index)}
                  >
                    <X className="text-gray-300 hover:text-gray-500 transition-colors" />
                  </button>
                </div>
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
