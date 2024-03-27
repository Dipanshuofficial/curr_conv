const ConvertCard = ({
  from,
  to,
  val,
  amt,
  lastUpdated,
  className
}: {
  from: string;
  to: string;
  val: number;
  amt: number;
  lastUpdated?: string;
  className?: string;
}) => {
  return (
    <div className={`flex ${className}`}>
      <div className="flex w-full px-10 bg-rose-700 rounded-lg h-14 items-center font-semibold text-xl">
        {from} {amt} = {to} {val}
      </div>
      <div className="flex flex-col absolute mt-[5.5rem] ml-[44rem] font-bold text-xl">

      {lastUpdated && lastUpdated.split("T")[0]} {lastUpdated && lastUpdated.split("T")[1].split('Z')}
      </div>
    </div>
  );
};

export default ConvertCard;
