import { PayButton } from '@/components/order-page/payBtn';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface OrderCardProps {
  price: number;
  id: string;
  // dorm: string;
}

export function OrderCard({ price, id }: OrderCardProps) {
  return (
    <Card key={id}>
      <CardHeader>
        <CardTitle>Unpaid Order</CardTitle>
        <CardDescription>you have unpaid order</CardDescription>
      </CardHeader>
      <CardContent>
        <p> Price: {price}</p>
      </CardContent>
      <CardFooter>
        <PayButton id={id} />
      </CardFooter>
    </Card>
  );
}
