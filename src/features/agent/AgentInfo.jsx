import { Card, CardBody, CardHeader, Chip, Typography } from "@material-tailwind/react";
import { useState } from "react";

export default function AgentInfo({ item, index }) {
  console.log(index);
  const orderHead = ["id", "date", "price", "status", "agent-Id", "description"];
  const [showOrders, setShowOrders] = useState(false);

  const tableHead = ["agent-id", "name", "title", "type", "sale", "leaderId"];
  const className = "px-4 py-2 border-b border-blue-gray-50";
  const typoClass = "font-semibold text-blue-gray-600";
  // ฟังก์ชั่นสำหรับเปิดและปิดการแสดงรายการออเดอร์
  const toggleOrders = () => {
    setShowOrders(!showOrders);
  };

  return (
    <>
      <table className="w-full min-w-[640px] table-auto text-center">
        {index === 0 && (
          <thead>
            <tr>
              {tableHead.map((el) => (
                <th key={el} className="border-b border-blue-gray-50">
                  <Typography className="font-extrabold uppercase text-blue-gray-700">{el}</Typography>
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          <tr>
            {/* AGENT-ID */}
            <td className={className}>
              <Typography className={typoClass}>{item.agentId}</Typography>
            </td>
            {/* NAME */}
            <td className={className}>
              <Typography className={typoClass} color="blue-gray">
                {item.agentName}
              </Typography>
            </td>
            {/* TITLE */}
            <td className={className}>
              <Typography className={typoClass}>{item.agentTitle}</Typography>
            </td>
            {/* TYPE */}
            <td className={className}>
              <Typography className={typoClass}>{item.agentType}</Typography>
            </td>
            {/* SALE */}
            <td className={className}>
              <Typography className={typoClass}>{item.sumPrice}</Typography>
            </td>
            {/* LEADER-ID */}
            <td className={className}>
              <Typography className={typoClass}>{item.leaderId}</Typography>
            </td>

            <td className={className}>
              <div className="flex justify-evenly">
                <button className="mx-2 w-6" onClick={toggleOrders}>
                  <img src="../../public/img/view-grid-detail-svgrepo-com.svg" alt="detail" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      {showOrders && (
        <div className="w-full">
          <Card>
            {/* Card Header */}
            <CardHeader className="m-2 px-4 py-2" variant="gradient" color="green">
              <Typography variant="h6" color="white">
                Order List
              </Typography>
            </CardHeader>

            {/* Card body */}
            <CardBody className="overflow-x-scroll m-0 p-0">
              <table className="w-full min-w-[640px] table-auto text-center">
                <thead>
                  <tr>
                    {orderHead.map((el) => (
                      <th key={el} className="border-b border-blue-gray-50 py-3 px-5">
                        <Typography className="text-[11px] font-bold uppercase text-blue-gray-700" variant="small">
                          {el}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {item.orders?.map((order, key) => {
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
                          <Typography className="font-semibold text-blue-gray-600"> {order?.date} </Typography>
                        </td>

                        {/* PRICE */}
                        <td className={className}>
                          <Typography className="font-semibold text-blue-gray-600">{order?.price}</Typography>
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
                          <Typography className="font-semibold text-blue-gray-600">
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
      )}
    </>
  );
}
