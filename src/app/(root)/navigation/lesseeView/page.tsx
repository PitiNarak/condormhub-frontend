import { PropertyScroll } from '@/components/userView/PropertyScroll';

export default function Page() {
  return (
    <div className="">
      <div className="text-center text-3xl font-bold">
        <p>Properties</p>
      </div>
      <div className="pt-7">
        <PropertyScroll />
      </div>
    </div>
  );
}
