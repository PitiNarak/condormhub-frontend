import { ScrollArea } from '@/components/ui/scroll-area';
import { getMyLeasingRequest } from '@/actions/leasingRequest/getMe';
import { LeasingRequestCard } from '@/components/leasingRequest-page/leasingRequestCard';

export async function RequestScroll() {
  const leasingRequest = await getMyLeasingRequest();
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <ScrollArea className="w-full">
        <div className="grid grid-cols-1 gap-5">
          {leasingRequest.data?.data && leasingRequest.data.data.length > 0
            ? leasingRequest.data.data.map((d) => (
                <LeasingRequestCard
                  key={d.id ?? Math.random()}
                  id={d.id ?? ''}
                  dormName={d.dorm?.name ?? 'DORM NAME'}
                  dormUrl={
                    d.dorm?.imagesUrl?.length && d.dorm.imagesUrl.length > 0
                      ? d.dorm.imagesUrl[0]
                      : '/image.jpeg'
                  }
                  lesseeName={d.lessee?.firstname ?? ''}
                  createAt={d.start ?? ''}
                  status={d.status ?? 'UNKNOWN'}
                  message={d.message ?? 'MESSAGE'}
                />
              ))
            : leasingRequest.data?.data && leasingRequest.data.data.length < 1
              ? 'Not found'
              : leasingRequest.error
                ? leasingRequest.error
                : 'Unknown Error'}
        </div>
      </ScrollArea>
    </div>
  );
}
