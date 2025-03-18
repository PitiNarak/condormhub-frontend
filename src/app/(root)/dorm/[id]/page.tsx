import { getDormByID } from '@/action/dorm/getDormByID';
import React from 'react';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const res = await getDormByID(id);
  console.log(res);
  return <div>page</div>;
};

export default page;
