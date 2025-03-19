import { RegisterBox } from '@/components/register-page/registerBox';

export default function Page() {
  return (
    <div className="justify-center m-auto pt-14 flex w-9/12 max-w-[450px]">
      <div className="flex-1">
        <RegisterBox />
      </div>
    </div>
  );
}
