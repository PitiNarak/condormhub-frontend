'use client';
import { getMyHistory } from '@/actions/historyList/getMyHistory';
import { HistoryCard } from '@/components/rentHistory-page/historyCard';
import { Loading } from '@/components/ui/loading';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { components } from '@/types/api';
import { useCallback, useEffect, useRef, useState } from 'react';

export function HistoryScroll() {
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [historyList, setRequests] =
    useState<components['schemas']['dto.LeasingHistory'][]>();

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
        { threshold: 1.0, rootMargin: '-100px' }
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchHistory = async (page: number) => {
    try {
      setLoading(true);
      const res = await getMyHistory(page);
      if ('message' in res) {
        showErrorToast(res.message ?? '');
      } else {
        setHasMore(res.pagination?.current_page != res.pagination?.last_page);
        setRequests((prev) => {
          return prev ? [...prev, ...(res.data ?? [])] : res.data;
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory(page);
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
    <div>
      {!historyList || historyList.length === 0 ? (
        <p className="text-center text-lg text-gray-500 py-10">No history</p>
      ) : (
        <div className="w-full max-w-2xl mx-auto p-4">
          <ScrollArea className="w-full">
            <div className="grid grid-cols-1 gap-5 mx-5">
              {historyList.map(
                (data: components['schemas']['dto.LeasingHistory'], index) => (
                  <div
                    ref={
                      index + 1 == historyList.length
                        ? lastPostElementRef
                        : undefined
                    }
                    key={String(data.id)}
                  >
                    <HistoryCard
                      dormName={data.dorm ? (data.dorm.name ?? '') : ''}
                      dormImageUrl={
                        data.dorm
                          ? data.dorm.imagesUrl
                            ? data.dorm.imagesUrl[0] !== ''
                              ? data.dorm.imagesUrl[0]
                              : 'https://placehold.co/100'
                            : 'https://placehold.co/100'
                          : 'https://placehold.co/400'
                      }
                      dormProvince={
                        data.dorm
                          ? data.dorm.address
                            ? (data.dorm.address.province ?? '')
                            : ''
                          : ''
                      }
                      dormDistrict={
                        data.dorm
                          ? data.dorm.address
                            ? (data.dorm.address.district ?? '')
                            : ''
                          : ''
                      }
                      dormRating={data.dorm ? (data.dorm.rating ?? 0) : 0}
                      ownerName={
                        data.dorm
                          ? data.dorm.owner
                            ? (data.dorm.owner.username ?? 'UNKNOWN')
                            : 'UNKNOWN'
                          : 'UNKNOWN'
                      }
                      ownerProfileUrl={
                        data.dorm
                          ? data.dorm.owner
                            ? data.dorm.owner.profilePicUrl
                              ? data.dorm.owner.profilePicUrl !== ''
                                ? data.dorm.owner.profilePicUrl
                                : 'https://placehold.co/60'
                              : 'https://placehold.co/60'
                            : 'https://placehold.co/60'
                          : 'https://placehold.co/60'
                      }
                      ownerID={
                        data.dorm
                          ? data.dorm.owner
                            ? (data.dorm.owner.id ?? '')
                            : ''
                          : ''
                      }
                      startDate={data.start ?? ''}
                      endDate={data.end ?? ''}
                      reviewFlag={data.reviewFlag ?? false}
                    />
                  </div>
                )
              )}
              {loading && (
                <Loading className="flex max-w-4xl mx-auto gap-2 pt-2"></Loading>
              )}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
