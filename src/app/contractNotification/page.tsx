import { ContractScroll } from '@/components/contractNoti-page/contractScroll';

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center p-10 gap-6">
      <div className="flex flex-col gap-3 max-w-3xl w-full">
        <h1 className="text-3xl pt-3 font-semibold text-center">Contract</h1>
        <ContractScroll />
      </div>
    </div>
  );
}
