import { Button, CardBody, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";

const orderHead = ["order-id", "date", "rate", "percent", "deduction", "description"];
const className = "px-4 py-2 border-b border-blue-gray-50";
const typoClass = "text-sm font-semibold text-blue-gray-600";

export default function ProductInfo({ agentOrderCancel, agentRate, onUpdateOrder }) {
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState();

  return (
    <>
      {/* Card body */}
      <CardBody className="m-0 p-0 grid overflow-x-scroll">
        <table className="mx-2 table-auto text-center">
          <thead>
            <tr>
              {orderHead.map((el) => (
                <th key={el} className="uppercase border-b border-blue-gray-50 px-1 py-2">
                  <Typography className={typoClass}>{el}</Typography>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {agentOrderCancel?.map((order, key) => {
              const deduction = +order?.deduction;

              return (
                <tr key={key}>
                  {/* ORDER_ID */}
                  <td className={className}>
                    <Typography className={typoClass} variant="small" color="blue-gray">
                      {order?.orderId}
                    </Typography>
                  </td>

                  {/* DATE */}
                  <td className={className}>
                    <Typography className={typoClass}> {order?.date} </Typography>
                  </td>

                  {/* RATE */}
                  <td className={className}>
                    <Typography className={typoClass}>{order?.rate.toLocaleString()}</Typography>
                  </td>

                  {/* PERCENT */}
                  <td className={className}>
                    <Typography className={typoClass}>{order.percent}</Typography>
                  </td>

                  {/* DEDUCTION */}
                  <td className={className}>
                    <Typography className={typoClass}>{deduction.toLocaleString()}</Typography>
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
    </>
  );
}
