import { getMyHistory } from '@/actions/historyList/getMyHistory';
import { PaginationControl } from '@/components/home-page/paginationControl';
import { HistoryCard } from '@/components/rentHistory-page/historyCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { components } from '@/types/api';
import { redirect } from 'next/navigation';

interface HistoryListProp {
  page: number;
}

export async function HistoryList({ page = 1 }: HistoryListProp) {
  const defaultPath = 'rentHistory/?page=1';
  const response = await getMyHistory(page);
  if ('message' in response) {
    redirect('/');
  }
  const historyList = response.data ?? [];
  const paginationElement = response.pagination;
  if (historyList.length < 0 || page < 1 || Number.isNaN(page)) {
    redirect(defaultPath);
  }

  return (
    <div>
      {historyList.length === 0 ? (
        <p className="text-center text-lg text-gray-500 py-10">No history</p>
      ) : (
        <div className="w-full max-w-2xl mx-auto p-4">
          <ScrollArea className="w-full">
            <div className="grid grid-cols-1 gap-5 mx-5">
              {historyList.map(
                (data: components['schemas']['dto.LeasingHistory']) => (
                  <div key={String(data.id)} className="text-sm">
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
            </div>
            <div className="mt-4">
              <PaginationControl
                lastPage={Number(paginationElement?.last_page)}
                basePath={defaultPath}
              />
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
