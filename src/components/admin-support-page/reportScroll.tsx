'use client';
import { getReport } from '@/actions/support/getReport';
import { ReportCard } from '@/components/admin-support-page/reportCard';
import { Loading } from '@/components/ui/loading';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { components } from '@/types/api';
import { useCallback, useEffect, useRef, useState } from 'react';

type StatusFilter = 'ALL' | 'OPEN' | 'IN-PROGRESS' | 'RESOLVED';

export function ReportScroll() {
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [reportList, setReport] =
    useState<components['schemas']['dto.SupportResponseBody'][]>();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');

  const handle = (id: string, status: string) => {
    setReport((reportList) =>
      reportList?.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

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
        const newData = res.data ?? [];
        setReport((prev) => {
          if (!prev) return newData;
          const seen = new Set(prev.map((item) => item.id));
          const filtered = newData.filter((item) => !seen.has(item.id));
          return [...prev, ...filtered];
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
    <div className="w-full flex flex-col items-center">
      <h1 className="text-3xl font-bold my-4">Reports</h1>

      <div className="flex space-x-2 mb-4">
        <StatusFilterButton
          status="ALL"
          currentFilter={statusFilter}
          onClick={() => setStatusFilter('ALL')}
        />
        <StatusFilterButton
          status="OPEN"
          currentFilter={statusFilter}
          onClick={() => setStatusFilter('OPEN')}
        />
        <StatusFilterButton
          status="IN-PROGRESS"
          currentFilter={statusFilter}
          onClick={() => setStatusFilter('IN-PROGRESS')}
        />
        <StatusFilterButton
          status="RESOLVED"
          currentFilter={statusFilter}
          onClick={() => setStatusFilter('RESOLVED')}
        />
      </div>

      {loading && <Loading className="flex max-w-4xl mx-auto gap-2 pt-2" />}

      {!reportList || reportList.length === 0 ? (
        <p className="text-center text-lg text-gray-500 py-10">
          {!loading
            ? `No ${statusFilter === 'ALL' ? '' : statusFilter.toLowerCase()} reports found`
            : ''}
        </p>
      ) : (
        <div className="w-full max-w-5xl mx-auto p-4">
          <ScrollArea className="w-full">
            <div className="grid grid-cols-1 gap-5 mx-5">
              {reportList
                .filter(
                  (r) => statusFilter === 'ALL' || r.status === statusFilter
                )
                .map(
                  (
                    data: components['schemas']['dto.SupportResponseBody'],
                    index
                  ) => (
                    <div
                      ref={
                        index + 1 === reportList.length &&
                        statusFilter === 'ALL'
                          ? lastPostElementRef
                          : undefined
                      }
                      key={String(data.id)}
                    >
                      <ReportCard
                        id={data.id ?? ''}
                        reporter={data.userID ?? ''}
                        date={data.createAt ?? ''}
                        message={data.message ?? ''}
                        status={data.status ?? ''}
                        handle={handle}
                      />
                    </div>
                  )
                )}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}

function StatusFilterButton({
  status,
  currentFilter,
  onClick,
}: {
  status: StatusFilter;
  currentFilter: StatusFilter;
  onClick: () => void;
}) {
  const isActive = status === currentFilter;

  const getButtonColors = () => {
    if (isActive) {
      return 'bg-black text-white';
    } else {
      return 'bg-white border-2 border-black';
    }
  };

  const displayText =
    status === 'ALL'
      ? 'All'
      : status === 'IN-PROGRESS'
        ? 'In Progress'
        : status.charAt(0) + status.slice(1).toLowerCase();

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 w-28 rounded-md text-sm font-medium transition-colors ${getButtonColors()}`}
    >
      {displayText}
    </button>
  );
}
