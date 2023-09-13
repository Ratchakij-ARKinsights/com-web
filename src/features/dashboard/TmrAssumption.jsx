import { Typography } from "@material-tailwind/react";
import React from "react";

export default function TmrAssumption({ agentTypeByComTier, totalAgentAndSale }) {
  const TABLE_HEAD = ["New", "Ex", "Top"];
  const TABLE_HEAD_TOTAL = [
    totalAgentAndSale[0].New.totalType,
    totalAgentAndSale[0].Experience.totalType,
    totalAgentAndSale[0].Top.totalType,
  ];

  return (
    <div className="bg-white border border-blue-gray-100">
      <div className="w-auto text-center bg-blue-500 opacity-95">
        <Typography variant="h4" color="blue-gray">
          TMR Assumption
        </Typography>
      </div>
      <table className="w-full min-w-max table-auto text-center">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="p-[5px] uppercase border-blue-gray-100 bg-blue-gray-50">
                <Typography variant="small" color="blue-gray" className="font-extrabold leading-none ">
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
          <tr>
            {TABLE_HEAD_TOTAL.map((type, index) => (
              <th key={index} className="p-[3.7px]  border-b  border-blue-gray-100 bg-blue-gray-50">
                <Typography variant="small" color="blue-gray" className="font-extrabold leading-none ">
                  {type}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {agentTypeByComTier.map((rowData, index) => (
            <tr key={index}>
              {/* <td className="py-2.5 border-b border-blue-gray-50">
                <Typography variant="small" color="blue-gray" className="font-semibold">
                  {rowData.rateStart.toLocaleString("en-US")}
                </Typography>
              </td> */}
              <td className="py-2.5 border-b border-blue-gray-50">
                <Typography variant="small" color="blue-gray" className="font-semibold">
                  {rowData.New == 0 ? "-" : rowData.New}
                </Typography>
              </td>
              <td className="py-2.5 border-b border-blue-gray-50">
                {rowData.tierLevel > 1 && (
                  <Typography variant="small" color="blue-gray" className="font-semibold">
                    {rowData.Experience == 0 ? "-" : rowData.Experience}
                  </Typography>
                )}
              </td>
              <td className="py-2.5 border-b border-blue-gray-50">
                {rowData.tierLevel > 2 && (
                  <Typography variant="small" color="blue-gray" className="font-semibold">
                    {rowData.Top == 0 ? "-" : rowData.Top}
                  </Typography>
                )}
              </td>
              {/* <td className="py-2.5 border-b border-blue-gray-50">
                <Typography variant="small" color="blue-gray" className="font-semibold">
                  {rowData.Total}
                </Typography>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
