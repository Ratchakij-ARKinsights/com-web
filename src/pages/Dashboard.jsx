import React, { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import ComDetail from "../features/dashboard/ComDetail";
import DashboardMain from "../features/dashboard/DashboardMain";
import RateTable from "../features/dashboard/RateTable";
import StatusShow from "../features/dashboard/StatusShow";

import * as comTierApi from "../api/comTier-api";
import * as employeeApi from "../api/employee-api";
import * as orderApi from "../api/order-api";

export default function HomePage() {
  const [comTier, setComTier] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [orders, setOrders] = useState([]);
  const [sumOrderByAgent, setSumOrderByAgent] = useState(null);

  // console.log(JSON.stringify(agentTypeByComTier));
  // console.log(agentTypeByComTier);
  // console.log(totalAgentAndSale);

  // const [agentTypeByComTier, setAgentTypeByComTier] = useState({});
  // const [totalSumByType, setTotalSumByType] = useState({});
  const { agentTypeByComTier, totalAgentAndSale } = processComTier(comTier, sumOrderByAgent);
  console.log(agentTypeByComTier);
  console.log(totalAgentAndSale);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function processComTier(comTier, sumOrderByAgent) {
    const processedAgentIds = new Set();

    const agentTypeByComTier = [];
    const totalAgentAndSale = {
      New: { totalType: 0, totalSale: 0 },
      Experience: { totalType: 0, totalSale: 0 },
      Top: { totalType: 0, totalSale: 0 },
      Total: { totalType: 0, totalSale: 0 },
    };
    comTier?.forEach((tier) => {
      const { tierLevel, rateStart, amount } = tier;
      const tieredAgentTypes = {
        New: 0,
        Experience: 0,
        Top: 0,
        Total: 0, // TMR
        Rate: 0,
        Amount: 0,
      };

      sumOrderByAgent.forEach((agent) => {
        if (processedAgentIds.has(agent.agentId)) {
          return;
        }
        if ((tierLevel <= 1 && agent.agentType === "Experience") || (tierLevel <= 2 && agent.agentType === "Top")) {
          processedAgentIds.add(agent.agentId);
          return;
        }

        if (agent.sumPrice >= rateStart) {
          // แยกประเภทของตัวแทนในแต่ละ ComTier
          // tieredAgentTypes[agent.agentType].push(agent);
          tieredAgentTypes[agent.agentType]++;
          tieredAgentTypes.Total++;

          // คำนวณผลรวมของแต่ละประเภททั้งหมด
          totalAgentAndSale[agent.agentType].totalType++;
          totalAgentAndSale[agent.agentType].totalSale += parseInt(agent.sumPrice, 10);
          totalAgentAndSale.Total.totalType++;
          totalAgentAndSale.Total.totalSale += parseInt(agent.sumPrice, 10);

          processedAgentIds.add(agent.agentId);
        }
      });

      // เก็บผลลัพธ์ของแต่ละ ComTier
      agentTypeByComTier.push({
        ...tieredAgentTypes,
        tierLevel: tierLevel,
        Rate: rateStart,
        Amount: amount,
      });
    });

    return { agentTypeByComTier, totalAgentAndSale };
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function getAgentTypeByTier(comTier, sumOrderByAgent) {
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
    return tableData;
  }
  const tableData = getAgentTypeByTier(comTier, sumOrderByAgent);
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [comTierResponse, employeeResponse, orderResponse, sumResponse] = await Promise.all([
          comTierApi.getComtier(),
          employeeApi.getAllEmployee(),
          orderApi.getAllOrder(),
          orderApi.getTotalPriceByAgentId(),
        ]);

        setComTier(comTierResponse.data.comTier);
        setEmployees(employeeResponse.data.employees);
        setOrders(orderResponse.data.orders);
        setSumOrderByAgent(sumResponse.data.totalPriceByAgentId);
      } catch (err) {
        console.error("เกิดข้อผิดพลาดในการเรียกข้อมูล:", err);
      }
    };

    // const calculateData = () => {
    //   try {

    //     // setAgentTypeByComTier(agentTypeByComTier);
    //     // setTotalSumByType(totalSumByType);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    fetchData();
    // calculateData();
  }, []);
  return (
    <div className="max-w-7xl mx-auto py-6 md:px-6 md:flex-col sm:px-6 sm:flex-col lg:px-8 mt-8 mb-8 flex flex-col gap-4 border-2 border-blue-gray-500">
      <div className="flex justify-center">
        <div className="h-[2rem] w-1/3">
          <Datepicker
            inputClassName="w-full bg-gray-100 border border-gray-500 text-gray-700 py-1 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="yearmonth"
            includeDay={false}
            popoverDirection="down"
            name="date"
            value=""
          />
        </div>
      </div>
      <div className="p-1 mt-6 border-2 border-blue-gray-500">
        <DashboardMain />
      </div>
      <div className="p-1 flex lg:flex-row md:flex-col sm:flex-col border border-blue-gray-500">
        <div className="lg:w-1/3 md:w-full">
          <RateTable comTier={comTier} />
        </div>
        <div className="lg:w-full">
          <ComDetail
            comTier={comTier}
            tableData={tableData}
            agentTypeByComTier={agentTypeByComTier}
            totalAgentAndSale={totalAgentAndSale}
          />
        </div>
      </div>
      <div className="p-1 border border-blue-gray-500">
        <StatusShow />
      </div>
    </div>
  );
}

// function getAgentPassTier(comTier, sumOrderByAgent) {
//   const processedAgentIds = new Set();
//   const filteredAgents = [];

//   comTier?.forEach((tier) => {
//     const { tierLevel, rateStart } = tier;

//     const agentsInTier = sumOrderByAgent.filter((agent) => {
//       if (processedAgentIds.has(agent.agentId)) {
//         return false;
//       }
//       if ((tierLevel <= 1 && agent.agentType === "Experience") || (tierLevel <= 2 && agent.agentType === "Top")) {
//         return false;
//       }

//       if (agent.sumPrice >= rateStart) {
//         processedAgentIds.add(agent.agentId);
//         return true;
//       }
//       return false;
//     });

//     filteredAgents.push(...agentsInTier);
//   });

//   return filteredAgents;
// }
// const filteredAgents = getAgentPassTier(comTier, sumOrderByAgent);
// console.log(filteredAgents);
