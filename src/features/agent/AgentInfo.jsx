import jsonData from "../../data/jsonData.json";

import { Card, CardHeader, CardBody, Typography, Avatar, Chip, Tooltip, Progress } from "@material-tailwind/react";

export default function AgentInfo() {
  const tableHead = ["#", "agent", "id", "status", "job", "salary", "completion", "employed", "acc no", ""];
  const agents = jsonData.agents;
  return (
    <div>
      <Card>
        {/* Card Header */}
        <CardHeader className="mb-8 p-4" variant="gradient" color="blue">
          <Typography variant="h6" color="white">
            Agent Member
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
              {agents.map((agent, key) => {
                const className = `py-3 px-5 ${key === agents.length - 1 ? "" : "border-b border-blue-gray-50"}`;

                return (
                  <tr key={key}>
                    {/* # */}
                    <td>
                      <Typography className="text-xs font-semibold text-blue-gray-600">{key + 1}</Typography>
                    </td>

                    {/* Avatar+Email */}
                    <td className={className}>
                      <div className="flex justify-center gap-4 w-full">
                        {/* <Avatar src={img} alt={name} size="sm" /> */}
                        <div>
                          <Typography className="font-semibold" variant="small" color="blue-gray">
                            {agent.name}
                          </Typography>
                          {/* <Typography className="text-xs font-normal text-blue-gray-500">{email}</Typography> */}
                        </div>
                      </div>
                    </td>

                    {/* ID */}
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">{agent.id}</Typography>
                    </td>

                    {/* Status */}
                    <td className={className}>
                      <div className="flex gap-2 justify-center">
                        <Chip
                          variant="ghost"
                          size="sm"
                          color={agent.status ? "green" : "red"}
                          value={agent.status ? "on" : "off"}
                          icon={
                            <span className={`mx-auto mt-1 block h-2 w-2 rounded-full ${agent.status ? "bg-green-900" : "bg-red-900"}`} />
                          }
                        />
                      </div>
                    </td>

                    {/* Position */}
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600"> {agent.job[0]} </Typography>
                      <Typography className="text-xs font-normal text-blue-gray-500"> {agent.job[1]} </Typography>
                    </td>

                    {/* Salary */}
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">{agent.salary}</Typography>
                    </td>

                    {/* Completion */}
                    <td className={className}>
                      <div className="w-10/12">
                        <Typography variant="small" className="mb-1 block text-xs font-medium text-blue-gray-600">
                          {agent.completion}%
                        </Typography>
                        <Progress
                          value={agent.completion}
                          variant="gradient"
                          color={agent.completion === 100 ? "green" : "blue"}
                          className="h-1"
                        />
                      </div>
                    </td>

                    {/* Date */}
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">{agent.date}</Typography>
                    </td>

                    {/* ACC NO */}
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">{agent.account_number}</Typography>
                    </td>

                    <td className={className}>
                      <div className="flex justify-evenly">
                        {/* <Typography as="a" href="#" className="w-6 inline-block text-xs  font-semibold text-blue-700">
                          <img src="../../public/img/view-grid-detail-svgrepo-com.svg" alt="detail" />
                        </Typography> */}

                        <button className="mx-2 w-6">
                          <img src="../../public/img/view-grid-detail-svgrepo-com.svg" alt="detail" />
                        </button>
                        {/* <button className="mx-2 w-6">
                          <img src="../../public/img/gui-trash-svgrepo-com.svg" alt="trash" />
                        </button> */}
                      </div>
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
