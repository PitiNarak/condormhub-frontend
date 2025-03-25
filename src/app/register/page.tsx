import { RegisterBox } from '@/components/register-page/registerBox';

export default async function Page() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex-1 w-full max-w-md pt-14 mx-4">
        <RegisterBox />
      </div>
    </div>
  );
}
