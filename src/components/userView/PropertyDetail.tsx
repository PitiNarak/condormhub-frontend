import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function PropertyDetailButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">See Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Property Detail</DialogTitle>
          <DialogDescription>
            This is the detail of the property.
          </DialogDescription>
        </DialogHeader>
        <div>
          <p>Details</p>
        </div>
        <DialogFooter>
          <Button>Contact</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
