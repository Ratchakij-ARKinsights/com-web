import { Card, CardBody, CardHeader, Chip, Typography } from "@material-tailwind/react";
import { useState } from "react";

const orderHead = ["id", "date", "price", "status", "agent-Id", "description"];
const className = "px-4 py-2 border-b border-blue-gray-50";
const typoClass = "text-sm font-semibold text-blue-gray-600";

export default function AgentInfo({ item, index }) {
  const [showOrders, setShowOrders] = useState(false);

  const agentSale = Number(item.sumPrice).toLocaleString();

  // ฟังก์ชั่นสำหรับเปิดและปิดการแสดงรายการออเดอร์
  const toggleOrders = () => {
    setShowOrders(!showOrders);
  };

  return (
    <>
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
            <Typography className={typoClass}>{agentSale}</Typography>
          </td>
          {/* LEADER-ID */}
          <td className={className}>
            <Typography className={typoClass}>{item.leaderId}</Typography>
          </td>

           <td className={className}>
            <button className="mx-2 w-6" onClick={toggleOrders}>
              <img src="../../public/img/view-grid-detail-svgrepo-com.svg" alt="detail" />
            </button>
          </td>
        </tr>
      </tbody>
      {showOrders && (
        <Card className="my-6 px-12 w-full absolute">
          {/* Card Header */}
          <CardHeader className="" variant="gradient" color="green">
            <Typography variant="h6" color="white">
              Order List
            </Typography>
          </CardHeader>

          {/* Card body */}
          <CardBody className="overflow-x-scroll overflow-y-visible m-0 p-0">
            <table className="w-full min-w-[640px] table-auto text-center">
              <thead>
                <tr>
                  {orderHead.map((el) => (
                    <th key={el} className="border-b border-blue-gray-50 py-3 px-5">
                      <Typography className={typoClass}>{el}</Typography>
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
                        <Typography className={typoClass}>{order?.id}</Typography>
                      </td>

                      {/* DATE */}
                      <td className={className}>
                        <Typography className={typoClass}> {order?.date} </Typography>
                      </td>

                      {/* PRICE */}
                      <td className={className}>
                        <Typography className={typoClass}>{order?.price.toLocaleString()}</Typography>
                      </td>

                      {/* ORDER STATUS */}
                      <td className={className}>
                        <Typography className={typoClass}>{order.status ? "Active" : "Cancel"}</Typography>
                      </td>

                      {/* AGENT-ID */}
                      <td className={className}>
                        <Typography className={typoClass}>{order?.agentId}</Typography>
                      </td>

                      {/* DESCRIPTION */}
                      <td className={className}>
                        <Typography className={typoClass}>{order?.description ? order?.description : ""}</Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      )}
    </>
  );
}
