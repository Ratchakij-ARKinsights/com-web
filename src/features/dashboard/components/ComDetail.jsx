import TarpProjection from "./TARPProjection";
import TmrAssumption from "./TmrAssumption";

export default function ComDetail({ comTier, sumOrderByAgent, setTotalCom }) {
  const processedAgentIds = new Set(); // เปลี่ยนให้เป็น Set เพื่อให้การตรวจสอบเร็วขึ้น
  const tableData = [];

  comTier?.forEach((tier) => {
    const { tierLevel, rateStart } = tier;

    const filteredAgents = sumOrderByAgent.filter((agent) => {
      if (processedAgentIds.has(agent.agentId)) {
        return false;
      }
      if ((tierLevel <= 1 && agent.agentType === "Experience") || (tierLevel <= 2 && agent.agentType === "Top")) {
        return false;
      }

      if (agent.sumPrice >= rateStart) {
        processedAgentIds.add(agent.agentId);
        return true; // เลือกตัวแทน Agent
      }
      return false; // ไม่เลือกตัวแทน Agent
    });

    const agentCountByType = {
      New: 0,
      Experience: 0,
      Top: 0,
      Total: 0,
    };

    filteredAgents.forEach((agent) => {
      agentCountByType[agent.agentType]++;
      agentCountByType.Total++;
    });

    tableData.push({
      rateStart,
      ...agentCountByType,
      agentTotal: agentCountByType.Total,
      tierLevel: tierLevel,
    });
  });
  // console.log(tableData);

  const totalType = tableData.reduce(
    (acc, item) => {
      acc.New += item.New;
      acc.Experience += item.Experience;
      acc.Top += item.Top;
      acc.Total += item.New + item.Experience + item.Top;
      return acc;
    },
    { New: 0, Experience: 0, Top: 0, Total: 0 }
  );
  // console.log(totalType);

  return (
    <>
      <div className="w-full h-full flex">
        <div className="w-1/2 flex flex-col ">
          <TmrAssumption tableData={tableData} totalType={totalType} />
        </div>
        <div className="w-1/2 flex flex-col">
          <TarpProjection comTier={comTier} tableData={tableData} />
        </div>
      </div>
    </>
  );
}
