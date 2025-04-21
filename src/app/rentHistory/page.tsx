import { HistoryScroll } from '@/components/rentHistory-page/historyScroll';

export default async function Page() {
  return (
    <div>
      <p className="text-center text-3xl font-bold">Leasing History</p>
      <div className="pt-7">
        <HistoryScroll />
      </div>
    </div>
  );
}
