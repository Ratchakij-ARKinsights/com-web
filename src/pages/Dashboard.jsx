import React, { useEffect, useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import DatePicker from "../components/DatePicker";
import ComDetail from "../features/dashboard/ComDetail";
import RateTable from "../features/dashboard/RateTable";
import Statistic from "../features/dashboard/Statistic";
import StatusShow from "../features/dashboard/StatusShow";
import InputErrorMessage from "../features/auth/components/InputErrorMessage";
import useApiData from "../hooks/useApiData";
import { getTotalTarp, processComTier } from "../features/dashboard/dashboardUtils/processComTier";
import validateInputDate from "../features/dashboard/validators/validate-inputDate";

export default function DashBoard() {
  const { comTier, sumOrderAgentByRange, getSumOrderByRange } = useApiData();
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    selectedStartDate: "",
    selectedEndDate: "",
    error: {},
  });

  const { agentTypeByComTier, totalAgentAndSale } = processComTier(comTier, sumOrderAgentByRange);
  const totalTarp = getTotalTarp(agentTypeByComTier);

  useEffect(() => {
    fetchRangeDefault();
  }, []);

  const fetchRangeDefault = () => {
    try {
      const dateNow = {
        startDate: new Date(),
        endDate: new Date(),
      };
      const month = dateNow.startDate.toLocaleString("en-US", { month: "long" });
      const year = dateNow.startDate.getFullYear();
      setDateRange((prevDateRange) => ({
        ...prevDateRange,
        startDate: dateNow.startDate,
        endDate: dateNow.endDate,
        selectedStartDate: { month, year },
        selectedEndDate: { month, year },
      }));
      getSumOrderByRange(dateNow);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitDateRange = async () => {
    try {
      const input = { startDate: dateRange.startDate, endDate: dateRange.endDate };
      const result = validateInputDate(input);

      if (result) {
        setDateRange((prevDateRange) => ({ ...prevDateRange, error: result }));
      } else {
        setDateRange((prevDateRange) => ({ ...prevDateRange, error: {} }));
        const dataToSend = { startDate: dateRange.startDate, endDate: dateRange.endDate };
        await getSumOrderByRange(dataToSend);
        setDateRange((prevDateRange) => ({
          ...prevDateRange,
          selectedStartDate: formatDate(dateRange.startDate),
          selectedEndDate: formatDate(dateRange.endDate),
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formatDate = (date) => {
    if (date) {
      const month = date.toLocaleString("en-US", { month: "long" });
      const year = date.getFullYear();
      return { month, year };
    }
    return null;
  };

  const getDisplayText = () => {
    const { selectedStartDate, selectedEndDate } = dateRange;
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
  };

  const displayText = getDisplayText();

  return (
    <div className="max-w-7xl mx-auto py-6 md:px-6 md:flex-col sm:px-6 sm:flex-col lg:px-8 mt-8 mb-8 flex flex-col gap-4 border-2 border-blue-gray-500">
      <div className="px-2 flex justify-between items-center">
        {dateRange.selectedStartDate && dateRange.selectedEndDate && (
          <div className="w-full text-center">
            <Typography variant="h3" color="blue-gray">
              {displayText}
            </Typography>
          </div>
        )}
        <div className="flex justify-evenly gap-5 items-center">
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
          <Button size="sm" color="blue" onClick={handleSubmitDateRange}>
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
