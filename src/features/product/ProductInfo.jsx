import { Button, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { useState } from "react";
import Modal from "../../components/Modal";
import EditOrder from "../product/EditOrder";

const orderHead = ["id", "date", "price", "status", "agent-Id", "description"];
const className = "px-4 py-2 border-b border-blue-gray-50";
const typoClass = "text-sm font-semibold text-blue-gray-600";

export default function ProductInfo({ item, index }) {
  const [open, setOpen] = useState(false);
  const [editOrder, setEditOrder] = useState({});
  const agentSale = Number(item.sumPrice).toLocaleString();
  console.log(agentSale);
  console.log(editOrder);
  return (
    <>
      {/* Card body */}
      <CardBody className="overflow-x-scroll m-0 p-0">
        <table className="w-full min-w-[640px] table-auto text-center">
          <thead>
            <tr>
              {orderHead.map((el) => (
                <th key={el} className="uppercase border-b border-blue-gray-50 py-3 px-5">
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
                    <Typography className={typoClass} variant="small" color="blue-gray">
                      {order?.id}
                    </Typography>
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

                  {/* EDIT */}
                  <td className={className}>
                    <Button
                      variant="text"
                      size="sm"
                      color="blue"
                      onClick={() => {
                        setEditOrder(order);
                        setOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <Modal title={`Edit Order ID: ${editOrder?.id}`} open={open} onClose={() => setOpen(false)}>
        <EditOrder editOrder={editOrder} />
      </Modal>
    </>
  );
}
