import React, { forwardRef, useEffect, useState } from "react";
import { Button, Typography } from "@material-tailwind/react";

import DatePicker from "../components/DatePicker";
import Statistic from "../features/dashboard/Statistic";
import RateTable from "../features/dashboard/RateTable";
import ComDetail from "../features/dashboard/ComDetail";
import StatusShow from "../features/dashboard/StatusShow";

import { processComTier, getTotalTarp } from "../features/dashboard/dashboardUtils/processComTier";
import * as comTierApi from "../api/comTier-api";
import * as employeeApi from "../api/employee-api";
import * as orderApi from "../api/order-api";
import InputErrorMessage from "../features/auth/components/InputErrorMessage";

import validateInputDate from "../features/dashboard/validators/validate-inputDate";

export default function HomePage() {
  const [error, setError] = useState({});
  const [comTier, setComTier] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [orders, setOrders] = useState([]);
  const [sumOrderAgent, setSumOrderByAgent] = useState(null);
  const [sumOrderAgentByRange, setTotalOrderByAgent] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState();
  const [selectedEndDate, setSelectedEndDate] = useState();
  // console.log(selectedStartDate);
  // console.log(selectedEndDate);
  // console.log(sumOrderAgent);
  // console.log(sumOrderAgentByRange);

  const { agentTypeByComTier, totalAgentAndSale } = processComTier(comTier, sumOrderAgentByRange);
  const totalTarp = getTotalTarp(agentTypeByComTier);

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

        const dateNow = {
          startDate: new Date(),
          endDate: new Date(),
        };
        const month = dateNow.startDate.toLocaleString("en-US", { month: "long" });
        const year = dateNow.startDate.getFullYear();

        const res = await orderApi.getSumOrderByRange(dateNow);
        setTotalOrderByAgent(res.data.sumOrderAgentByRange);
        setSelectedStartDate({ month, year });
        setSelectedEndDate({ month, year });
      } catch (err) {
        setError({
          date: err?.message ?? "Invalid",
        });
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const input = { startDate, endDate };
      const result = validateInputDate(input);
      if (result) {
        return setError(result);
      }
      setError({});
      // if (!startDate) {
      //   throw new Error("Invalid start date");
      // }
      // if (!endDate) {
      //   throw new Error("Invalid end date");
      // }
      const dataToSend = {
        startDate,
        endDate,
      };

      const formatDate = (date) => {
        if (date) {
          const month = date.toLocaleString("en-US", { month: "long" });
          const year = date.getFullYear();
          return { month, year };
        }
        return null;
      };

      setSelectedStartDate(formatDate(startDate));
      setSelectedEndDate(formatDate(endDate));

      const res = await orderApi.getSumOrderByRange(dataToSend);
      setTotalOrderByAgent(res.data.sumOrderAgentByRange);
    } catch (err) {
      console.log(err);
    }
  };

  function getDisplayText(selectedStartDate, selectedEndDate) {
    if (!selectedStartDate || !selectedEndDate) {
      return "";
    }

    const startMonth = selectedStartDate.month;
    const startYear = selectedStartDate.year;
    const endMonth = selectedEndDate.month;
    const endYear = selectedEndDate.year;

    if (startYear === endYear) {
      return startMonth === endMonth ? `${endMonth} ${endYear}` : `${startMonth} - ${endMonth} ${endYear}`;
    }
    return `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
  }
  const displayText = getDisplayText(selectedStartDate, selectedEndDate);
  return (
    <div className="max-w-7xl mx-auto py-6 md:px-6 md:flex-col sm:px-6 sm:flex-col lg:px-8 mt-8 mb-8 flex flex-col gap-4 border-2 border-blue-gray-500">
      <div className="px-2 flex justify-between items-center ">
        {selectedStartDate && selectedEndDate && (
          <div className="w-full text-center">
            <Typography variant="h3" color="blue-gray">
              {displayText}
            </Typography>
          </div>
        )}
        <div className="flex justify-evenly gap-5 items-center">
          <div className="flex flex-col">
            <p>
              <InputErrorMessage message={error.startDate} />
            </p>
            <DatePicker
              selected={startDate}
              name="startDate"
              onChange={(date) => setStartDate(date)}
              placeholderText="Start date"
            />
          </div>
          <div className="flex flex-col">
            <p>
              <InputErrorMessage message={error.endDate} />
            </p>
            <DatePicker
              selected={endDate}
              name="endDate"
              onChange={(date) => setEndDate(date)}
              placeholderText="End date"
            />
          </div>
          <Button size="sm" color="blue" onClick={handleSubmit}>
            OK
          </Button>
        </div>
      </div>
      <div className="p-1 mt-6 border-2 border-blue-gray-500">
        <Statistic totalAgentAndSale={totalAgentAndSale} totalTarp={totalTarp} />
      </div>
      <div className="p-1 flex lg:flex-row md:flex-col sm:flex-col border border-blue-gray-500">
        <RateTable comTier={comTier} />
        <ComDetail agentTypeByComTier={agentTypeByComTier} totalAgentAndSale={totalAgentAndSale} />
      </div>
      <div className="p-1 border border-blue-gray-500">
        <StatusShow />
      </div>
    </div>
  );
}
