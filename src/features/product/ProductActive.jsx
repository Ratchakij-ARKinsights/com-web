import { Button, CardBody, Typography } from "@material-tailwind/react";
import { useState } from "react";
import Modal from "../../components/Modal";
import EditOrder from "./EditOrder";

const orderHead = ["id", "date", "price", "status", "agent-Id", "description"];
const className = "px-4 py-2 border-b border-blue-gray-50";
const typoClass = "text-sm font-semibold text-blue-gray-600";

export default function ProductActive({ agentOrder, agentRate, onUpdateOrder, onUpdateOrderCancel }) {
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
            {agentOrder?.map((order, key) => {
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
                      className="m-1 p-1"
                      variant="text"
                      size="sm"
                      color="blue"
                      onClick={() => {
                        setOrder(order);
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

      <Modal title={`Edit Order ID: ${order?.id}`} open={open} onClose={() => setOpen(false)}>
        <EditOrder
          order={order}
          agentRate={agentRate}
          onUpdateOrder={onUpdateOrder}
          onUpdateOrderCancel={onUpdateOrderCancel}
          onSuccess={() => {
            setOpen(false);
          }}
        />
      </Modal>
    </>
  );
}
