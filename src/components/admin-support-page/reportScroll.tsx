'use client';
import { getReport } from '@/actions/support/getReport';
import { ReportCard } from '@/components/admin-support-page/reportCard';
import { Loading } from '@/components/ui/loading';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { components } from '@/types/api';
import { useCallback, useEffect, useRef, useState } from 'react';

export function ReportScroll() {
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [reportList, setReport] =
    useState<components['schemas']['dto.SupportResponseBody'][]>();

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

  const fetchReport = async (page: number) => {
    try {
      setLoading(true);
      const res = await getReport(page);
      if ('message' in res) {
        showErrorToast(res.message ?? '');
      } else {
        setHasMore(res.pagination?.current_page != res.pagination?.last_page);
        setReport((prev) => {
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
    fetchReport(page);
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
      {!reportList || reportList.length === 0 ? (
        <p className="text-center text-lg text-gray-500 py-10">No report</p>
      ) : (
        <div className="w-full max-w-2xl mx-auto p-4">
          <ScrollArea className="w-full">
            <div className="grid grid-cols-1 gap-5 mx-5">
              {reportList.map(
                (
                  data: components['schemas']['dto.SupportResponseBody'],
                  index
                ) => (
                  <div
                    ref={
                      index + 1 == reportList.length
                        ? lastPostElementRef
                        : undefined
                    }
                    key={String(data.id)}
                  >
                    <ReportCard
                      reporter={data.userID ?? ''}
                      date={data.createAt ?? ''}
                      message={data.message ?? ''}
                      status={data.status ?? ''}
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
