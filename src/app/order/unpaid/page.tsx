import { getUnpaidOrder } from '@/actions/order/getUnpaid';
import { OrderCard } from '@/components/order-page/orderCard';
import { components } from '@/types/api';

type Order = components['schemas']['dto.OrderResponseBody'][];

export default async function UnpaidPage() {
  const unpaid = (await getUnpaidOrder()) as Order;
  if (unpaid.length > 0) {
    return (
      <div className="container mx-auto">
        {unpaid.map((e) => (
          <OrderCard key={e.id} price={e.price || 0} id={e.id || ''} />
        ))}
      </div>
    );
  }
  return;
}
