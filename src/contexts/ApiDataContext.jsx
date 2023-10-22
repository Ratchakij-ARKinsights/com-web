import { createContext, useEffect, useState } from "react";

import * as comTierApi from "../api/comTier-api";
import * as employeeApi from "../api/employee-api";
import * as orderApi from "../api/order-api";
import useAuth from "../hooks/useAuth";

export const ApiDataContext = createContext();

export default function ApiDataContextProvider({ children }) {
  const { authUser } = useAuth();

  const [comTier, setComTier] = useState(null);
  const [leadComTier, setLeadComTier] = useState(null);
  const [employees, setEmployees] = useState([]);

  const [orders, setOrders] = useState([]);
  const [agentSale, setAgentSale] = useState();
  const [sumOrderAgentByRange, setSumOrderAgentByRange] = useState(null);
  const [orderAgentByRangeByLeader, setOrderAgentByRangeByLeader] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!authUser) return;

        const [comTierResponse, leadComTierResponse, employeeResponse, orderResponse, agentsSaleResponse] =
          await Promise.all([
            comTierApi.getComtier(),
            comTierApi.getLeadComtier(),
            employeeApi.getAllEmployee(),
            orderApi.getAllOrder(),
            employeeApi.getAgentSale(),
          ]);

        setComTier(comTierResponse.data.comTier);
        setLeadComTier(leadComTierResponse.data.leadComTier);
        setEmployees(employeeResponse.data.employees);
        setOrders(orderResponse.data.orders);
        setAgentSale(agentsSaleResponse.data.agentSales);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [authUser]);

  const getSumOrderByRange = async (dataToSend) => {
    if (!dataToSend) {
      return;
    }

    const res = await orderApi.getSumOrderByRange(dataToSend);
    setSumOrderAgentByRange(res.data.sumOrderAgentByRange);
    setOrderAgentByRangeByLeader(res.data.agentDataByLeader);
  };

  const processComTier = (agentOrder) => {
    try {
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

      if (agentOrder) {
        // Create a copy of agentOrder to avoid modifying the original array
        const updatedAgentOrder = [...agentOrder];

        comTier?.map((tier) => {
          const { tierLevel, rateStart, percent, amount } = tier;
          const tieredAgentTypes = {
            New: 0,
            Experience: 0,
            Top: 0,
            Total: 0,
          };

          for (let i = 0; i < updatedAgentOrder.length; i++) {
            const agent = updatedAgentOrder[i];

            if (processedAgentIds.has(agent.agentId)) {
              continue;
            }

            if ((tierLevel <= 1 && agent.agentType === "Experience") || (tierLevel <= 2 && agent.agentType === "Top")) {
              continue;
            }

            if (agent.sumPrice >= rateStart) {
              // Increment the tieredAgentTypes count
              tieredAgentTypes[agent.agentType]++;
              tieredAgentTypes.Total++;

              // Update totalAgentAndSale
              totalAgentAndSale[0][agent.agentType].totalType++;
              totalAgentAndSale[0][agent.agentType].totalSale += parseInt(agent.sumPrice, 10);

              totalAgentAndSale[1].Total.totalType++;
              totalAgentAndSale[1].Total.totalSale += parseInt(agent.sumPrice, 10);

              processedAgentIds.add(agent.agentId);
              updatedAgentOrder.splice(i, 1);
              i--;
            }
          }

          totalAgentAndSale[1].Total.totalType += tieredAgentTypes.Total;

          agentTypeByComTier.push({
            ...tieredAgentTypes,
            tierLevel: tierLevel,
            Rate: rateStart,
            Percent: percent,
            Amount: amount,
          });
        });
      }
      return { agentTypeByComTier, totalAgentAndSale };
    } catch (err) {
      console.log(err);
    }
  };

  const getTotalTarp = (agentTypeByComTier) => {
    const totalTarp = [];
    const tarpSum = { tmr: 0, tarp: 0, agent_com: 0 };

    try {
      agentTypeByComTier?.map((rowData) => {
        tarpSum.tmr += rowData.Total;
        tarpSum.tarp += rowData.Total * rowData.Rate;
        tarpSum.agent_com += rowData.Total * rowData.Amount;
      });

      const comVsTarp = (tarpSum.agent_com / tarpSum.tarp) * 100;
      const tarpVsTmr = Math.round(tarpSum.tarp / tarpSum.tmr);

      totalTarp.push({ tarpSum });
      totalTarp.push({ com_Vs_Tarp: comVsTarp });
      totalTarp.push({ tarp_Vs_Tmr: tarpVsTmr });

      return totalTarp;
    } catch (err) {
      console.log(err);
    }
  };

  const getLeadComtier = (totalTarp) => {
    let leadCom = [];
    let comSup = 0;
    let accSup = 0;
    let comAm = 0;
    let accAm = 0;

    // เรียงลำดับ leadComtierData โดยให้ Supervisor ขึ้นก่อน Area Manager
    const sortLeadComTier = leadComTier?.sort((a, b) => {
      if (a.title === "Supervisor" && b.title === "Area Manager") {
        return -1;
      } else if (a.title === "Area Manager" && b.title === "Supervisor") {
        return 1;
      }
      return 0;
    });
    sortLeadComTier?.map((item) => {
      const leadPercent = item.percent;
      const agentCom = totalTarp[0].tarpSum.agent_com;

      if (item.title === "Supervisor") {
        comSup = Math.round(agentCom * leadPercent * 0.01);
        accSup = agentCom + comSup;
        leadCom.push({
          title: item.title,
          com: comSup,
          acc: accSup,
        });
      }

      if (item.title === "Area Manager") {
        comAm = comSup * leadPercent * 0.01;
        accAm = accSup + comAm;
        leadCom.push({
          title: item.title,
          com: comAm,
          acc: accAm,
        });
      }
    });
    return leadCom;
  };

  const { agentTypeByComTier, totalAgentAndSale } = processComTier(sumOrderAgentByRange);
  const totalTarp = getTotalTarp(agentTypeByComTier);
  const leadCom = getLeadComtier(totalTarp);

  return (
    <ApiDataContext.Provider
      value={{
        comTier,
        setComTier,
        leadComTier,
        setLeadComTier,
        employees,
        orders,
        agentSale,
        sumOrderAgentByRange,
        getSumOrderByRange,
        processComTier,
        getTotalTarp,
        getLeadComtier,
        agentTypeByComTier,
        totalAgentAndSale,
        totalTarp,
        leadCom,
      }}
    >
      {children}
    </ApiDataContext.Provider>
  );
}
