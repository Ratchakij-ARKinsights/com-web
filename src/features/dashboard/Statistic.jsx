import CardFour from "./CardFour";
import CardOne from "./CardOne";
import CardThree from "./CardThree";
import CardTwo from "./CardTwo";
import StaticCard from "./StaticCard";
const footer = { color: "text-green-500", value: "+55%", label: "than last week" };
export default function Statistic({ totalAgentAndSale, totalTarp }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <CardOne />
      <CardTwo />
      <CardThree totalAgentAndSale={totalAgentAndSale} />
      <CardFour totalTarp={totalTarp} />
      {/* {statisticData.map((item, index) => (
        <StaticCard key={index} item={item} />
      ))} */}
    </div>
  );
}
