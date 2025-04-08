import { HistoryList } from '@/components/rentHistory-page/historyList';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const page = await searchParams;
  return (
    <div>
      <p className="text-center text-3xl font-bold">Leasing History</p>
      <div>
        <HistoryList page={Number(page)} />
      </div>
    </div>
  );
}
