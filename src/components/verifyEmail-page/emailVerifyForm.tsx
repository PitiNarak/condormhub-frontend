'use client';

// import { verifyEmail } from '@/actions/verifyEmail/verify';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
import { EmailVerifyCard } from '@/components/verifyEmail-page/emailVerifyCard';
// import { useSearchParams } from 'next/navigation';

export function EmailVerifyForm() {
  // const searchParams = useSearchParams();
  // const token = searchParams.get('token');
  // if (!token) {
  //   redirect('/');
  // }
  // useEffect(() => {
  //   const res = verifyEmail(token ?? '');
  //   res
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);
  return <EmailVerifyCard isLoading={false} error="" />;
}
