import { Button, Card, CardHeader, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import * as employeeApi from "../api/employee-api";
import * as orderApi from "../api/order-api";
import DatePicker from "../components/DatePicker";
import InputErrorMessage from "../features/auth/components/InputErrorMessage";
import useApiData from "../hooks/useApiData";
import { getAgentOrderByRange } from "../utils/agent-function";

import ProductInfo from "../features/product/ProductInfo";

export default function ProductPage() {
  const { comTier, employees, processComTier, getTotalTarp, getLeadComtier } = useApiData();
  const agents = employees.filter((agent) => agent.title === "Agent");
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    error: {},
  });

  // const [agentOrderByRange, setAgentOrderByRange] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [agentOrder, setAgentOrder] = useState([]);
  const [agentOrderCancel, setAgentOrderCancel] = useState([]);
  const [agentSale, setAgentSale] = useState("");

  const orderId = agentOrder?.map((order) => order.id);
  let agentRate = { rate: "No Commission", percent: "No Commission" };

  if (agentSale) {
    const comRate = processComTier(agentSale);
    const result = comRate.agentTypeByComTier.find((value) => value.Total !== 0);
    if (result) {
      agentRate = {
        rate: result.Rate,
        percent: result.Percent,
      };
    }
  }
  console.log(JSON.stringify(agentOrderCancel));
  const handleEmployeeSelect = (e) => {
    const selectedId = e.target.value;
    setEmployeeId(+selectedId);
  };

  useEffect(() => {}, [agentOrder, agentOrderCancel]);

  const onUpdateOrder = async (order) => {
    // prev แทนค่า state ก่อนหน้า (ค่าเดิม) ของ orderAgent.
    setAgentOrder((prev) => prev.map((item) => (item.id === order.id ? order : item)));
    console.log(orderId);
    const cancelOrderRes = await orderApi.getOrderCancel(orderId);
    const cancelOrder = cancelOrderRes.data.cancelOrder;
    console.log(cancelOrder);
    setAgentOrderCancel(cancelOrder);
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
        endDate: dateRange.startDate,
        // endDate: dateRange.endDate,
        selectEmployee,
      };
      const [agentSaleRes, orderSaleRes] = await Promise.all([
        employeeApi.getAgentSaleDateByLeaderId(input),
        orderApi.getOrderAgentByRange(input),
      ]);

      const agentSale = agentSaleRes.data.agentSaleDateByLeader;
      const orderSale = orderSaleRes.data.orders;
      // const updatedAgentOrderByRange = getAgentOrderByRange(orderSale, agentSale);

      const orderId = orderSale.map((order) => order.id);
      const cancelOrderRes = await orderApi.getOrderCancel(orderId);
      const cancelOrder = cancelOrderRes.data.cancelOrder;
      setAgentSale(agentSale);
      setAgentOrder(orderSale);
      setAgentOrderCancel(cancelOrder);
      // setAgentOrderByRange(updatedAgentOrderByRange);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 mt-8 mb-8 flex flex-col gap-12">
      <header className="bg-white shadow ">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="items-center justify-between md:flex">
            <div className="max-w-lg">
              <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">Product</h3>
              {/* <p className="text-gray-600 mt-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p> */}
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Select DATE && EMPLOYEES */}
        <div className="w-full flex justify-center items-center gap-6 p-2 mb-4 ">
          <div className="p-2 flex items-center gap-4">
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
              {/* <div className="flex flex-col">
                <p>
                  <InputErrorMessage message={dateRange.error.endDate} />
                </p>
                <DatePicker
                  selected={dateRange.endDate}
                  name="endDate"
                  onChange={(date) => setDateRange((prevDateRange) => ({ ...prevDateRange, endDate: date }))}
                  placeholderText="End date"
                />
              </div> */}
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
                {agents?.map((agent, index) => (
                  <option key={index} value={agent.id}>
                    {agent.name} id:{agent.id}
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

        {/* CANCEL ORDER */}
        <div className="p-6">
          <Card>
            <CardHeader className="m-2 px-4 py-2" variant="gradient" color="red">
              <Typography variant="h6" color="white">
                Order Cancel
              </Typography>
            </CardHeader>
            <table className="mx-2 table-auto text-center">
              <thead>
                <tr>
                  <th className="px-4 py-2">Order ID</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Rate</th>
                  <th className="px-4 py-2">Percent</th>
                  <th className="px-4 py-2">Deduction</th>
                  <th className="px-4 py-2">Description</th>
                </tr>
              </thead>
              <tbody>
                {agentOrderCancel?.map((item) => (
                  <tr key={item.id}>
                    <td className="border px-4 py-2">{item.orderId}</td>
                    <td className="border px-4 py-2">{item.date}</td>
                    <td className="border px-4 py-2">{item.rate}</td>
                    <td className="border px-4 py-2">{item.percent}</td>
                    <td className="border px-4 py-2">{item.deduction}</td>
                    <td className="border px-4 py-2">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* ORDER LIST */}
        <div className="p-6">
          <Card>
            <CardHeader className="m-2 px-4 py-2" variant="gradient" color="green">
              <Typography variant="h6" color="white">
                Order List
              </Typography>
            </CardHeader>
            <ProductInfo agentOrder={agentOrder} agentRate={agentRate} onUpdateOrder={onUpdateOrder} />;
          </Card>
        </div>
      </main>
    </div>
  );
}
