import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

interface LinkBtnProp {
  text: string;
  path: string;
}

function LinkBtn({ text, path }: LinkBtnProp) {
  return (
    <div className="block p-2">
      <Link href={path} className={buttonVariants({ variant: 'default' })}>
        {text}
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <div className="">
      <h1 className="p-2 text-2xl font-bold">Where do you want to go</h1>
      <LinkBtn text="Register Page" path="/register" />
      <LinkBtn text="Lessee Page" path="/home/lesseeView" />
      <LinkBtn text="Admin Page" path="/admin" />
      <LinkBtn text="Lifestyle Tag Page" path="/lifestyle" />
      <LinkBtn text="Verification Page" path="/verification" />
      <LinkBtn text="Lessor Rent Income Page" path="/lessorIncome" />
      <LinkBtn text="Lessor Notification Page" path="lessorNotification" />
      <LinkBtn text="Lessee Notification Page" path="/lesseeNotification" />
      <LinkBtn text="Lessor Property Requests" path="/lessorRequest" />
    </div>
  );
}
