'use client';
import { getContract } from '@/actions/contract/getContract';
import { ContractCard } from '@/components/contractNoti-page/contractCard';
import { Loading } from '@/components/ui/loading';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { components } from '@/types/api';
import { useCallback, useEffect, useRef, useState } from 'react';

export function ContractScroll() {
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [contractList, setContract] =
    useState<components['schemas']['dto.ContractResponseBody'][]>();

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
        { threshold: 1.0, rootMargin: '100px' }
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchContract = async (page: number) => {
    try {
      setLoading(true);
      const res = await getContract(page);
      if ('error' in res) {
        showErrorToast(res.error ?? '');
      } else {
        setHasMore(
          res.data.pagination?.current_page != res.data.pagination?.last_page
        );
        setContract((prev) => {
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
    fetchContract(page);
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
      {!contractList || contractList.length === 0 ? (
        <p className="text-center text-lg text-gray-500 py-10">No history</p>
      ) : (
        <div className="w-full max-w-2xl mx-auto p-4">
          <ScrollArea className="w-full">
            <div className="grid grid-cols-1 gap-5 mx-5">
              {contractList.map(
                (
                  data: components['schemas']['dto.ContractResponseBody'],
                  index
                ) => (
                  <div
                    ref={
                      index + 1 == contractList.length
                        ? lastPostElementRef
                        : undefined
                    }
                    key={String(data.id)}
                  >
                    <ContractCard
                      contractID={data.id || ''}
                      dormName={data.dorm?.name || ''}
                      dormImageUrl={data.dorm?.imagesUrl?.at(0) || ''}
                      dormProvince={data.dorm?.address?.province || ''}
                      dormDistrict={data.dorm?.address?.district || ''}
                      dormRating={data.dorm?.rating || 0}
                      dormPrice={data.dorm?.price || 0}
                      dormSize={data.dorm?.size || 0}
                      dormBedroom={data.dorm?.bedrooms || 0}
                      dormBathroom={data.dorm?.bathrooms || 0}
                      lesseeName={data.lessee?.username || ''}
                      lesseeProfileUrl={data.lessee?.profilePicUrl?.at(0) || ''}
                      lesseeID={data.lessee?.id || ''}
                      lessorName={data.dorm?.owner?.username || ''}
                      lessorProfileUrl={
                        data.dorm?.owner?.profilePicUrl?.at(0) || ''
                      }
                      lessorID={data.dorm?.owner?.id || ''}
                      lesseeStatus={data.lesseeStatus || 'WAITING'}
                      lessorStatus={data.lessorStatus || 'WAITING'}
                      contractStatus={data.contractStatus || 'WAITING'}
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
