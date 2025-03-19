import type { Metadata } from 'next';
import '@/app/globals.css';
import Header from '@/components/navigationBar/header';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (session?.access_token) {
    console.log(session);
    redirect('/home/lesseeView');
  }
  return (
    <div className="flex flex-col h-screen">
      <Header />
      {children}
    </div>
  );
}
