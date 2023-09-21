import { Button, Card, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import useApiData from "../hooks/useApiData";
import DatePicker from "../components/DatePicker";
import AgentSummary from "../features/agent/AgentSummary";
import RateTable from "../features/dashboard/RateTable";
import ComDetail from "../features/dashboard/ComDetail";
import AgentInfo from "../features/agent/AgentInfo";
import InputErrorMessage from "../features/auth/components/InputErrorMessage";
import { getAgentOrderByRange } from "../utils/agent-function";
import * as employeeApi from "../api/employee-api";
import * as orderApi from "../api/order-api";

export default function AgentPage() {
  const tableHead = ["agent-id", "name", "title", "type", "sale", "leaderId"];

  const { comTier, employees, processComTier, getTotalTarp, getLeadComtier } = useApiData();

  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    error: {},
  });

  const [employeeId, setEmployeeId] = useState();
  const [agentSaleDateByLeader, setAgentSaleDateByLeader] = useState();
  const [agentOrderByRange, setAgentOrderByRange] = useState([]);

  const { agentTypeByComTier, totalAgentAndSale } = processComTier(agentSaleDateByLeader);
  const totalTarp = getTotalTarp(agentTypeByComTier);
  const leadCom = getLeadComtier(totalTarp);

  const handleEmployeeSelect = (e) => {
    const selectedId = e.target.value;
    setEmployeeId(parseInt(selectedId));
  };

  const handleSubmit = async () => {
    try {
      const selectEmployee = employees.find((employee) => employee.id === employeeId);
      if (!selectEmployee || !dateRange.startDate || !dateRange.endDate) {
        console.log("input invalid");
        return;
      }
      const input = {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        selectEmployee,
      };
      const [agentSaleRes, orderSaleRes] = await Promise.all([
        employeeApi.getAgentSaleDateByLeaderId(input),
        orderApi.getOrderAgentByRange(input),
      ]);
      const agentSale = agentSaleRes.data.agentSaleDateByLeader;
      const orderSale = orderSaleRes.data.orders;
      setAgentSaleDateByLeader(agentSale);

      const updatedAgentOrderByRange = getAgentOrderByRange(orderSale, agentSale);
      setAgentOrderByRange(updatedAgentOrderByRange);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 mt-8 mb-8 flex flex-col gap-6">
        <header className="bg-white shadow ">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="items-center justify-between md:flex">
              <div className="max-w-lg">
                <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">Agent</h3>
                {/* <p className="text-gray-600 mt-2">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p> */}
              </div>
              {/* <div className="mt-3 md:mt-0">
                <button className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm">
                  Add Member
                </button>
              </div> */}
            </div>
          </div>
        </header>
        {/* Select DATE && EMPLOYEES */}
        <div className="w-full flex justify-center items-center gap-6 p-2 mb-6 ">
          <div className="p-2 flex flex-col items-center gap-4">
            {/* DATE */}
            <div className="flex gap-5 ">
              <div className="flex flex-col">
                <p>
                  <InputErrorMessage message={dateRange.error.startDate} />
                </p>
                <DatePicker
                  selected={dateRange.startDate}
                  name="startDate"
                  onChange={(date) => setDateRange((prevDateRange) => ({ ...prevDateRange, startDate: date }))}
                  placeholderText="Start date"
                />
              </div>
              <div className="flex flex-col">
                <p>
                  <InputErrorMessage message={dateRange.error.endDate} />
                </p>
                <DatePicker
                  selected={dateRange.endDate}
                  name="endDate"
                  onChange={(date) => setDateRange((prevDateRange) => ({ ...prevDateRange, endDate: date }))}
                  placeholderText="End date"
                />
              </div>
            </div>
            {/* EMPLOYEE */}
            <div className="w-72">
              <select
                className="block w-full bg-gray-200 border border-gray-500 text-gray-700 py-1 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name="employee"
                value={employeeId}
                onChange={handleEmployeeSelect}
              >
                <option value="">Select</option>
                {employees?.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name} id:{item.id}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <Button size="sm" color="blue" onClick={handleSubmit}>
              OK
            </Button>
          </div>
        </div>
        <div className="p-1 w-full flex flex-col gap-2 border border-blue-gray-500">
          <AgentSummary totalTarp={totalTarp} leadCom={leadCom} />
          <div className="flex lg:flex-row md:flex-col sm:flex-col">
            <RateTable comTier={comTier} />
            <ComDetail agentTypeByComTier={agentTypeByComTier} totalAgentAndSale={totalAgentAndSale} />
          </div>
          <div className="bg-white border border-blue-gray-100">
            <div className="w-auto text-center bg-orange-900 opacity-90">
              <Typography variant="h4" color="black">
                Agent Member
              </Typography>
            </div>
            <Card className="p-2 flex flex-col overflow-x-scroll">
              <table className="w-full min-w-[640px] table-auto text-center">
                <thead>
                  <tr>
                    {tableHead.map((el) => (
                      <th key={el} className="border-b border-blue-gray-50">
                        <Typography className="font-extrabold uppercase text-blue-gray-700">{el}</Typography>
                      </th>
                    ))}
                  </tr>
                </thead>

                {agentOrderByRange?.map((item, index) => {
                  return <AgentInfo key={index} index={index} item={item} />;
                })}
              </table>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
