export interface textCardProp {
  icon: React.ReactNode;
  header: string;
  data: string;
}

export function TextInCard({ icon, header, data }: textCardProp) {
  return (
    <div className="grid grid-cols-[120px,1fr] md:grid-cols-[1fr,2fr]">
      <div className="flex align-middle">
        {icon}
        <p className="font-bold pl-2">{header} :</p>
      </div>
      <p className="pl-1">{data}</p>
    </div>
  );
}
