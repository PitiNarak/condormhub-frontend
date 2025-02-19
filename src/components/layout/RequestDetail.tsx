import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import RequestBar from './RequestBar';

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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-left">Request Detail</DialogTitle>
          <DialogDescription className="text-left">
            <p>{proposal}</p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
