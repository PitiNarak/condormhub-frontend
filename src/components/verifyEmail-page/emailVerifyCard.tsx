import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleCheckBig, CircleX } from 'lucide-react';
import { OrbitProgress } from 'react-loading-indicators';

interface Props {
  isLoading: boolean;
  error?: string;
}

export function EmailVerifyCard({ isLoading, error }: Props) {
  return (
    <Card className="mx-auto max-w-screen-sm min-h-64">
      <CardHeader>
        <CardTitle className="text-center text-4xl">
          Verifying Your Email
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 items-center justify-center">
          {isLoading ? (
            <OrbitProgress
              color="#000000"
              size="medium"
              text="verify"
              textColor=""
            />
          ) : error ? (
            <>
              <CircleX size={72} color="red" />
              <span className="text-lg text-red-600 font-bold">{error}</span>
            </>
          ) : (
            <>
              <CircleCheckBig size={72} color="green" />
              <span className="text-lg text-green-700 font-bold">Success</span>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
