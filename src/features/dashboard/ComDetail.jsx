import TarpProjection from "./TARPProjection";
import TmrAssumption from "./TmrAssumption";

export default function ComDetail({ agentTypeByComTier, totalAgentAndSale }) {
  return (
    <>
      <div className="w-full h-full flex">
        <div className="w-1/2 flex flex-col ">
          <TmrAssumption agentTypeByComTier={agentTypeByComTier} totalAgentAndSale={totalAgentAndSale} />
        </div>
        <div className="w-1/2 flex flex-col">
          <TarpProjection agentTypeByComTier={agentTypeByComTier} />
        </div>
      </div>
    </>
  );
}
