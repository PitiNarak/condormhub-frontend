import { ScrollArea } from '@/components/ui/scroll-area';
import { CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { MockNotifications } from '@/mocks/mockNotifications';

export function LessorNotificationScroll() {
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <ScrollArea className="w-full">
        <div className="grid grid-cols-1 gap-5">
          {MockNotifications.map((data, index) => (
            <div
              key={index}
              className="flex gap-4 p-4 border rounded-lg shadow-md items-start bg-gray-50"
            >
              <Image
                src={'/image.jpeg'}
                alt={`Image of ${data.propName}`}
                width={60}
                height={60}
                className="object-cover rounded-full h-[60px] w-[60px]"
              />
              <div className="flex-1">
                <CardTitle className="text-lg font-semibold">
                  Lease Completed
                </CardTitle>
                <p className="text-sm">Property: {data.propName}</p>
                <p className="text-sm">Lessee: {data.requestUser}</p>
              </div>
              <p className="text-sm text-gray-600 self-start">{data.date}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
