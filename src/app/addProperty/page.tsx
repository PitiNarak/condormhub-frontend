import AddPropertyForm from './addPropertyForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function Page() {
  return (
    <div className="flex w-full items-center justify-center h-[100vh]">
      <div className="w-full max-w-2xl lg:w-3/4">
        <div className={cn('flex flex-col gap-6')}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Add Property</CardTitle>
              <CardDescription>
                Enter your property information below to add your property
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AddPropertyForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
