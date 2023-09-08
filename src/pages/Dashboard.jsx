import React, { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import ComDetail from "../features/dashboard/components/ComDetail";
import DashboardMain from "../features/dashboard/components/DashboardMain";
import RateTable from "../features/dashboard/components/RateTable";
import StatusShow from "../features/dashboard/components/StatusShow";

import * as comTierApi from "../api/comTier-api";
import * as employeeApi from "../api/employee-api";
import * as orderApi from "../api/order-api";

export default function HomePage() {
  const [comTier, setComTier] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [orders, setOrders] = useState([]);
  const [sumOrderByAgent, setSumOrderByAgent] = useState(null);

  const [totalCom, setTotalCom] = useState();

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
    fetchData();
  }, []);
console.log(comTier);
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
          <ComDetail comTier={comTier} sumOrderByAgent={sumOrderByAgent} setTotalCom={setTotalCom} />
        </div>
      </div>
      <div className="p-1 border border-blue-gray-500">
        <StatusShow />
      </div>
    </div>
  );
}
