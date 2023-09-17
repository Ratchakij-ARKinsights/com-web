import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";

export default function AgentInfo({ agentSaleDateByLeader }) {
  const tableHead = ["agent-id", "name", "title", "type", "sale", "leaderId"];
  return (
    <div className="bg-white border border-blue-gray-100">
      <div className="w-auto text-center bg-black opacity-80">
        <Typography variant="h4" color="white">
          Agent Member
        </Typography>
      </div>
      {/* Card body */}
      <Card className="overflow-x-scroll m-0 p-0">
        <table className="w-full min-w-[640px] table-auto text-center ">
          <thead>
            <tr>
              {tableHead.map((el) => (
                <th key={el} className="border-b border-blue-gray-50 py-3.5 px-5">
                  <Typography className="text-[11px] font-extrabold uppercase text-blue-gray-700">{el}</Typography>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {agentSaleDateByLeader?.map((agent, key) => {
              const className = `py-3 px-5 ${
                key === agentSaleDateByLeader.length - 1 ? "" : "border-b border-blue-gray-50"
              }`;

              return (
                <tr key={key}>
                  {/* AGENT-ID */}
                  <td className={className}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">{agent.agentId}</Typography>
                  </td>
                  {/* NAME */}
                  <td className={className}>
                    <div className="flex justify-center gap-4 w-full">
                      <Typography className="font-semibold" variant="small" color="blue-gray">
                        {agent.agentName}
                      </Typography>
                    </div>
                  </td>
                  {/* TITLE */}
                  <td className={className}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">{agent.agentTitle}</Typography>
                  </td>
                  {/* TYPE */}
                  <td className={className}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">{agent.agentType}</Typography>
                  </td>
                  {/* SALE */}
                  <td className={className}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">{agent.sumPrice}</Typography>
                  </td>
                  {/* LEADER-ID */}
                  <td className={className}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">{agent.leaderId}</Typography>
                  </td>

                  <td className={className}>
                    <div className="flex justify-evenly">
                      <button className="mx-2 w-6">
                        <img src="../../public/img/view-grid-detail-svgrepo-com.svg" alt="detail" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
