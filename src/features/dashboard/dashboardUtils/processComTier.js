export function processComTier(comTier, sumOrderByAgent) {
  const processedAgentIds = new Set();
  const agentTypeByComTier = [];
  const totalAgentAndSale = [
    {
      New: { totalType: 0, totalSale: 0 },
      Experience: { totalType: 0, totalSale: 0 },
      Top: { totalType: 0, totalSale: 0 },
    },
    { Total: { totalType: 0, totalSale: 0 } },
  ];

  comTier?.forEach((tier) => {
    const { tierLevel, rateStart, amount } = tier;
    const tieredAgentTypes = {
      New: 0,
      Experience: 0,
      Top: 0,
      Total: 0,
    };

    sumOrderByAgent?.forEach((agent) => {
      if (processedAgentIds.has(agent.agentId)) {
        return;
      }

      if ((tierLevel <= 1 && agent.agentType === "Experience") || (tierLevel <= 2 && agent.agentType === "Top")) {
        processedAgentIds.add(agent.agentId);
        return;
      }

      if (agent.sumPrice >= rateStart) {
        tieredAgentTypes[agent.agentType]++;
        tieredAgentTypes.Total++;

        totalAgentAndSale[0][agent.agentType].totalType++;
        totalAgentAndSale[0][agent.agentType].totalSale += parseInt(agent.sumPrice, 10);
        totalAgentAndSale[1].Total.totalSale += parseInt(agent.sumPrice, 10);

        processedAgentIds.add(agent.agentId);
      }
    });

    totalAgentAndSale[1].Total.totalType += tieredAgentTypes.Total;

    agentTypeByComTier.push({
      ...tieredAgentTypes,
      tierLevel: tierLevel,
      Rate: rateStart,
      Amount: amount,
    });
  });

  return { agentTypeByComTier, totalAgentAndSale };
}

export function getTotalTarp(agentTypeByComTier) {
  const totalTarp = [];
  const tarpSum = { tmr: 0, tarp: 0, com: 0 };
  let comVsTarp = 0;

  try {
    agentTypeByComTier?.forEach((rowData) => {
      tarpSum.tmr += rowData.Total;
      tarpSum.tarp += rowData.Total * rowData.Rate;
      tarpSum.com += rowData.Total * rowData.Amount;
    });

    comVsTarp = (tarpSum.com / tarpSum.tarp) * 100;

    totalTarp.push({
      tarpSum,
    });

    totalTarp.push({
      comVsTarp: comVsTarp,
    });

    return totalTarp;
  } catch (err) {
    console.log(err);
  }
}
