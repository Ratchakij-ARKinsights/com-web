import { Card, CardHeader, CardBody, Typography, Avatar, Chip, Tooltip, Progress } from "@material-tailwind/react";
import { useEffect } from "react";

export default function AgentList({ employees }) {
  // console.log(employees);
  const tableHead = ["id", "name", "title", "type", "leaderId"];

  return (
    <div>
      <Card>
        {/* Card Header */}
        <CardHeader className="mb-8 p-4" variant="gradient" color="blue">
          <Typography variant="h6" color="white">
            Employee Member
          </Typography>
        </CardHeader>

        {/* Card body */}
        <CardBody className="overflow-x-scroll m-0 p-0">
          <table className="w-full min-w-[640px] table-auto text-center">
            <thead>
              <tr>
                {tableHead.map((el) => (
                  <th key={el} className="border-b border-blue-gray-50 py-3 px-5">
                    <Typography className="text-[11px] font-bold uppercase text-blue-gray-700" variant="small">
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {employees?.map((employee, key) => {
                const className = `py-3 px-5 ${key === employees.length - 1 ? "" : "border-b border-blue-gray-50"}`;

                return (
                  <tr key={key}>

                    {/* ID */}
                    <td className={className}>
                      <Typography className="font-semibold" variant="small" color="blue-gray">
                        {employee?.id}
                      </Typography>
                    </td>

                    {/* NAME */}
                    <td className={className}>
                      <Typography className="font-semibold" variant="small" color="blue-gray">
                        {employee?.name}
                      </Typography>
                    </td>

                    {/* Title */}
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600"> {employee?.title} </Typography>
                    </td>

                    {/* Type */}
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">{employee?.type}</Typography>
                    </td>

                    {/* Leader ID */}
                    <td className={className}>
                      {employee?.leaderId && (
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {employee?.leaderId}
                        </Typography>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
