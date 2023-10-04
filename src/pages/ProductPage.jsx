import { Card, CardHeader, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import * as employeeApi from "../api/employee-api";
import * as orderApi from "../api/order-api";
import DatePicker from "../components/DatePicker";
import InputErrorMessage from "../features/auth/components/InputErrorMessage";
import useApiData from "../hooks/useApiData";

import ProductActive from "../features/product/ProductActive";
import ProductCancel from "../features/product/ProductCancel";

export default function ProductPage() {
  const { comTier, employees, processComTier, getTotalTarp, getLeadComtier } = useApiData();

  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null, error: "" });
  const [selectAgent, setSelectAgent] = useState("");
  const [agentOrder, setAgentOrder] = useState([]);
  const [agentOrderCancel, setAgentOrderCancel] = useState([]);
  const [agentRate, setAgentRate] = useState({});
  const [agentSale, setAgentSale] = useState("");

  // let agentRate = { rate: "No Commission", percent: "No Commission" };

  const handleDateSelect = (date) => {
    setDateRange({ startDate: date, endtDate: date });
  };

  const handleEmployeeSelect = async (e) => {
    const selectedId = +e.target.value;
    const selectAgent = await employees.find((employee) => employee.id === selectedId);
    setSelectAgent(selectAgent);
  };

  const fetchAgentCom = async () => {
    try {
      if (dateRange && selectAgent) {
        const input = {
          startDate: dateRange.startDate,
          endDate: dateRange.startDate,
          selectAgent,
        };

        // GET TOTAL SALE & ORDER OF AGENT
        const [agentSaleRes, orderSaleRes] = await Promise.all([
          employeeApi.getAgentSaleDateByLeaderId(input),
          orderApi.getOrderAgentByRange(input),
        ]);

        const agentSale = agentSaleRes.data.agentSaleDateByLeader;
        const orderSale = orderSaleRes.data.orders;
        setAgentSale(agentSale);
        setAgentOrder(orderSale);

        // GET ORDER CANCEL OF AGENT
        const orderCancelRes = await orderApi.getOrderCancel(orderSale);
        const orderCancel = orderCancelRes.data.cancelOrder;
        setAgentOrderCancel(orderCancel);

        // GET COMMISSION OF AGENT
        const comRate = processComTier(agentSale);
        const result = comRate.agentTypeByComTier.find((value) => value.Total !== 0);

        if (result) {
          const rate = {
            rate: result.Rate,
            percent: result.Percent,
          };
          setAgentRate(rate);
        }
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล: ", error);
    }
  };

  useEffect(() => {
    fetchAgentCom();
  }, [dateRange, selectAgent]);

  const onUpdateOrder = async (updateOrder) => {
    // prev แทนค่า state ก่อนหน้า (ค่าเดิม) ของ orderAgent.
    setAgentOrder((prev) => prev.map((item) => (item.id === updateOrder.id ? updateOrder : item)));
    console.log(updateOrder);
    if (updateOrder.status) {
      setAgentOrderCancel((prev) => prev.filter((item) => item.orderId !== updateOrder.id));
      return;
    }
  };

  const onUpdateOrderCancel = async (orderCancel) => {
    setAgentOrderCancel((prev) => {
      const updatedArray = [...prev, orderCancel];

      // Sort the updatedArray by date in descending order
      updatedArray.sort((a, b) => new Date(b.date) - new Date(a.date));

      return updatedArray;
    });
  };

  // const handleSubmit = async () => {
  //   try {
  //     if (!selectAgent || !dateRange.startDate || !dateRange.endDate) {
  //       console.log("input invalid");
  //       return;
  //     }

  //     const input = {
  //       startDate: dateRange.startDate,
  //       endDate: dateRange.startDate,
  //       selectAgent,
  //     };
  //     console.log(input);

  //     const orderId = agentOrder?.map((order) => order.id);

  //     if (orderId) {
  //       const cancelOrderRes = await orderApi.getOrderCancel(orderId);
  //       const cancelOrder = cancelOrderRes.data.cancelOrder;
  //       setAgentOrderCancel(cancelOrder);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const orderHead = ["order-id", "date", "rate", "percent", "deduction", "description"];
  const className = "px-4 py-2 border-b border-blue-gray-50";
  const typoClass = "text-sm font-semibold text-blue-gray-600";
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
                  <InputErrorMessage message={dateRange.error} />
                </p>
                <DatePicker
                  selected={dateRange.startDate}
                  name="startDate"
                  onChange={handleDateSelect}
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
                value={selectAgent.id}
                onChange={handleEmployeeSelect}
              >
                <option value="">Select</option>
                {employees
                  ?.filter((agent) => agent.title === "Agent")
                  .map((agent, index) => (
                    <option key={index} value={agent.id}>
                      {agent.name} id:{agent.id}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          {/* <div>
            <Button size="sm" color="blue" onClick={handleSubmit}>
              OK
            </Button>
          </div> */}
        </div>

        {/* ORDER LIST */}
        <div className="mb-6">
          <Card>
            <CardHeader className="m-2 px-4" variant="gradient" color="green">
              <Typography variant="h6" color="white">
                Order List
              </Typography>
            </CardHeader>
            <ProductActive
              agentOrder={agentOrder}
              agentRate={agentRate}
              onUpdateOrder={onUpdateOrder}
              onUpdateOrderCancel={onUpdateOrderCancel}
            />
          </Card>
        </div>

        {/* CANCEL ORDER */}
        {/* {agentOrderCancel?.length > 0 && ( */}
        <div className="mb-6">
          <Card>
            <CardHeader className="m-2 px-4" variant="gradient" color="red">
              <Typography variant="h6" color="white">
                Order Cancel
              </Typography>
            </CardHeader>
            <ProductCancel agentOrderCancel={agentOrderCancel} />
          </Card>
        </div>
      </main>
    </div>
  );
}
