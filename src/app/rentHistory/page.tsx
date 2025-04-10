import { HistoryList } from '@/components/rentHistory-page/historyList';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = params.page;
  return (
    <div>
      <p className="text-center text-3xl font-bold">Leasing History</p>
      <div className="pt-7">
        <HistoryList page={Number(page)} />
      </div>
    </div>
  );
}
