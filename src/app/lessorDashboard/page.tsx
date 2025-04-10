// import { OwnerPropertyScroll } from '@/components/lessorDashboard-page/ownerPropertyScroll';
// import { auth } from '@/lib/auth';
// import { redirect } from 'next/navigation';

// export default async function Page({
//   searchParams,
// }: {
//   searchParams: Promise<{ page: string }>;
// }) {
//   const { page } = await searchParams;

//   // Authenticate and check role
//   const session = await auth();

//   if (!session || session.user?.role?.toLowerCase() !== 'lessor') {
//     console.log('redirect to home because you are not lessor');
//     redirect('/'); // Redirect if not a LESSOR
//   }

//   const pageNum = parseInt(page, 10) || 1;

//   return (
//     <div>
//       <div className="flex flex-col justify-center items-center p-10 gap-6">
//         <div className="flex flex-col gap-3 max-w-3xl w-full">
//           <h1 className="text-3xl pt-3 font-semibold text-center">
//             Lessor Property Dashboard
//           </h1>
//         </div>
//       </div>
//       <OwnerPropertyScroll
//         profileID={session.user.id ?? ''}
//         showIncome={true}
//         page={pageNum}
//       />
//     </div>
//   );
// }
