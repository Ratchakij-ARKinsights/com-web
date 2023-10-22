import { Card, CardHeader, div, Typography, Avatar, Chip, Tooltip, Progress } from "@material-tailwind/react";
import { useEffect } from "react";

export default function AgentList({ employees }) {
  // console.log(employees);
  const tableHead = ["#", "Name", "Title", "Type", "Lead-ID", "Login ID", "Status"];

  return (
    <div className="bg-white">
      <div className="px-2 py-1 bg-gray-300">
        <Typography variant="h6" color="blue-gray">
          Agent Member
        </Typography>
      </div>

      <div className="overflow-x-scroll m-0 p-0">
        <table className="w-full min-w-[640px] table-auto text-center">
          <thead>
            <tr className="m-1 p-1 bg-blue-400">
              {tableHead.map((el, index) => (
                <th key={index} className="py-1 border-b border-blue-gray-50 ">
                  <Typography variant="small" className="text-white">
                    {el}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {employees?.map((employee, key) => {
              const className = `py-2 ${key === employees.length - 1 ? "" : "border-b border-blue-gray-50"}`;

              return (
                <tr key={key}>
                  {/* ID */}
                  <td className={className}>
                    <Typography variant="small" className=" text-blue-gray-600">
                      {employee?.id}
                    </Typography>
                  </td>

                  {/* NAME */}
                  <td className={className}>
                    <Typography variant="small" className="text-blue-gray-600">
                      {employee?.name}
                    </Typography>
                  </td>

                  {/* Title */}
                  <td className={className}>
                    <Typography variant="small" className="text-blue-gray-600">
                      {employee?.title}
                    </Typography>
                  </td>

                  {/* Type */}
                  <td className={className}>
                    <Typography variant="small" className="text-blue-gray-600">
                      {employee?.type}
                    </Typography>
                  </td>

                  {/* Leader ID */}
                  <td className={className}>
                    <Typography variant="small" className="text-blue-gray-600">
                      {employee?.leaderId ? employee?.leaderId : ""}
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
