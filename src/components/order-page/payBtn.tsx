'use client';

import { createTransaction } from '@/actions/transaction/createTransaction';
import { Button } from '@/components/ui/button';
import { components } from '@/types/api';
import { redirect } from 'next/navigation';

type URLType = components['schemas']['dto.CreateTransactionResponseBody'];

export function PayButton({ id }: { id: string }) {
  function handleClick() {
    createTransaction(id).then((data) => {
      redirect((data as URLType).checkoutUrl || '');
    });
  }
  return <Button onClick={handleClick}>Pay</Button>;
}
