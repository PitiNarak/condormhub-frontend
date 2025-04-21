'use client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getMyLeasingRequest } from '@/actions/leasingRequest/getMe';
import { LeasingRequestCard } from '@/components/leasingRequest-page/leasingRequestCard';
import { useCallback, useEffect, useRef, useState } from 'react';
import { components } from '@/types/api';
import { useToast } from '@/hooks/use-toast';
import { Loading } from '@/components/ui/loading';

type requests = components['schemas']['dto.LeasingRequest'][];

export function RequestScroll({ isLessor }: { isLessor: boolean }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [requests, setRequests] = useState<requests>();

  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage((prevPage) => prevPage + 1);
          }
        },
        { threshold: 1.0 }
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchRequests = async (page: number) => {
    try {
      setLoading(true);
      const res = await getMyLeasingRequest(page);
      if ('error' in res) {
        showErrorToast(res.error ?? '');
      } else {
        setHasMore(
          res.data.pagination?.current_page != res.data.pagination?.last_page
        );
        setRequests((prev) => {
          return prev ? [...prev, ...(res.data.data ?? [])] : res.data.data;
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(page);
    fetchRequests(page);
  }, [page]);

  const { toast } = useToast();
  const showErrorToast = (error: string) => {
    toast({
      variant: 'destructive',
      title: 'Uh oh! Something went wrong.',
      description: error,
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <ScrollArea className="w-full">
        <div className="grid grid-cols-1 gap-5">
          {requests && requests.length > 0
            ? requests.map((d, index) => {
                if (index + 1 === requests.length) {
                  return (
                    <LeasingRequestCard
                      ref={lastPostElementRef}
                      key={d.id ?? Math.random()}
                      id={d.id ?? ''}
                      dormName={d.dorm?.name ?? 'DORM NAME'}
                      dormId={d.dorm?.id ?? ''}
                      dormUrl={
                        d.dorm?.imagesUrl?.length && d.dorm.imagesUrl.length > 0
                          ? d.dorm.imagesUrl[0]
                          : '/image.jpeg'
                      }
                      lesseeName={d.lessee?.firstname ?? ''}
                      createAt={d.start ?? ''}
                      status={d.status ?? 'UNKNOWN'}
                      message={d.message ?? 'MESSAGE'}
                      isLessor={isLessor}
                    />
                  );
                } else {
                  return (
                    <LeasingRequestCard
                      key={d.id ?? Math.random()}
                      id={d.id ?? ''}
                      dormName={d.dorm?.name ?? 'DORM NAME'}
                      dormId={d.dorm?.id ?? ''}
                      dormUrl={
                        d.dorm?.imagesUrl?.length && d.dorm.imagesUrl.length > 0
                          ? d.dorm.imagesUrl[0]
                          : '/image.jpeg'
                      }
                      lesseeName={d.lessee?.firstname ?? ''}
                      createAt={d.start ?? ''}
                      status={d.status ?? 'UNKNOWN'}
                      message={d.message ?? 'MESSAGE'}
                      isLessor={isLessor}
                    />
                  );
                }
              })
            : requests && requests.length < 1 && !loading && 'Not found'}
          {loading && (
            <Loading className="flex max-w-4xl mx-auto gap-2 pt-2"></Loading>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
