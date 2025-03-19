import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import PropertyCard from '@/components/lesseeHome-page/PropertyCard';
import { PropertyI } from '@/types/property';
import { displayPrice } from '@/function/display';
import { RequestBtn } from '@/components/request/RequestBtn';

export function PropertyDetail({
  image,
  rating,
  bedroom,
  bathroom,
  province,
  district,
  price,
  propertyName,
  owner,
  size,
  description,
}: PropertyI) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <PropertyCard
          image={image}
          rating={rating}
          bedroom={bedroom}
          bathroom={bathroom}
          propertyName={propertyName}
          province={province}
          district={district}
          price={price}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-left">{propertyName}</DialogTitle>
          <DialogDescription className="text-left">
            <p>Bedroom : {bedroom}</p>
            <p>Bathroom : {bathroom}</p>
            <p>
              Location : {province}, {district}
            </p>
            <p>Size : {size} sq.m.</p>
            <p>Own by {owner}</p>
            <p>Description :</p>
            <p>&emsp;{description}</p>
          </DialogDescription>
        </DialogHeader>
        <div>
          <p>Price : {displayPrice(price)}</p>
        </div>
        <DialogFooter>
          <RequestBtn />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
