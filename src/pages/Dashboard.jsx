import { Card, CardHeader, CardBody, Typography, Avatar, Chip, Tooltip, Progress } from "@material-tailwind/react";

import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import jsonData from "../data/jsonData.json";
import CardShow from "../features/dashboard/components/ProductCard";
import DatePicker from "../components/DatePicker";
import DashboardStats from "../features/dashboard/components/StatusShow";
import DashboardMain from "../features/dashboard/components/DashboardMain";
import StatusShow from "../features/dashboard/components/StatusShow";
import { RateTable } from "../features/dashboard/components/RateTable";

export default function HomePage() {
  const agents = jsonData.agents;
  const products = jsonData.products;

  return (
    <>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 mt-8 mb-8 flex flex-col gap-8">
        {/*  */}
        <div>
          <RateTable />
        </div>
        <div className="h-[2rem] flex justify-end w-full">
          <DatePicker />
        </div>
        {/*  */}
        <div>
          <DashboardMain />
        </div>
        <div>
          <StatusShow />
        </div>
      </div>
    </>
  );
}
