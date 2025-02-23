import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import RequestBar from './RequestBar';
import { Button } from '../ui/button';

export interface notiProposal {
  requestId: string;
  requestUser: string;
  propName: string;
  proposal: string;
}

export function RequestDetail({
  requestId,
  requestUser,
  propName,
  proposal,
}: notiProposal) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <RequestBar
          requestId={requestId}
          requestUser={requestUser}
          propName={propName}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] sm:max-h-[400]">
        <DialogHeader>
          <DialogTitle className="text-left">Request Detail</DialogTitle>
          <DialogDescription className="text-left">
            <p>{proposal}</p>
          </DialogDescription>
          <div className="flex justify-end m-auto]">
            <div className="flex1 mr-2">
              <Button>Accept</Button>
            </div>
            <div className="flex1">
              <Button variant={'outline'}>Decline</Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
