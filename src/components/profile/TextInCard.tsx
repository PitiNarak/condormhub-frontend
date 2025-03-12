export interface textCardProp {
  icon: React.ReactNode;
  header: string;
  data: string;
}

function TextInCard({ icon, header, data }: textCardProp) {
  return (
    <div className="flex justify-center mx-auto md:grid md:grid-cols-[1fr,2fr]">
      <div className="flex">
        {icon}
        <p className="font-bold pl-1">{header} :</p>
      </div>
      <p className="pl-1">{data}</p>
    </div>
  );
}
export default TextInCard;
