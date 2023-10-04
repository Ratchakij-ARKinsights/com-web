import { Card, CardHeader, CardBody, Typography, Avatar, Chip, Tooltip, Progress } from "@material-tailwind/react";

export default function OrderList({ orders, tableHead }) {
  return (
    <div>
      <Card>
        {/* Card Header */}
        <CardHeader className="m-2 p-2" variant="gradient" color="green">
          <Typography variant="h6" color="white">
            Order List
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
              {orders?.map((order, key) => {
                const className = `py-3 px-5 ${key === orders.length - 1 ? "" : "border-b border-blue-gray-50"}`;

                return (
                  <tr key={key}>
                    {/* ID */}
                    <td className={className}>
                      <Typography className="font-semibold" variant="small" color="blue-gray">
                        {order?.id}
                      </Typography>
                    </td>

                    {/* DATE */}
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600"> {order?.date} </Typography>
                    </td>

                    {/* PRICE */}
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">{order?.price}</Typography>
                    </td>

                    {/* ORDER STATUS */}
                    <td className={className}>
                      <div className="flex gap-2 justify-center">
                        <Chip
                          variant="ghost"
                          size="sm"
                          color={order.status ? "green" : "red"}
                          value={order.status ? "on" : "off"}
                          icon={
                            <span
                              className={`mx-auto mt-1 block h-2 w-2 rounded-full ${
                                order.status ? "bg-green-900" : "bg-red-900"
                              }`}
                            />
                          }
                        />
                      </div>
                    </td>

                    {/* AGENT-ID */}
                    <td className={className}>
                      <Typography className="font-semibold" variant="small" color="blue-gray">
                        {order?.agentId}
                      </Typography>
                    </td>

                    {/* DESCRIPTION */}
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {order?.description ? order?.description : ""}
                      </Typography>
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
