import CardFour from "./CardFour";
import CardStat from "./CardStat";
import CardThree from "./CardThree";
export default function Statistic({ totalAgentAndSale, totalTarp, leadCom }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      {leadCom?.map((item, index) => (
        <CardStat key={index} item={item} totalTarp={totalTarp} />
      ))}

      <CardThree totalAgentAndSale={totalAgentAndSale} />
      <CardFour totalTarp={totalTarp} />
    </div>
  );
}
