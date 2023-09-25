import { Button, Textarea } from "@material-tailwind/react";
import React, { useState } from "react";

import * as orderApi from "../../api/order-api";

export default function EditOrder({ order, agentRate, onUpdateOrder, onSuccess }) {
  const initialInput = {
    price: order.price,
    status: order.status,
    description: order.description,
    agentId: order.agentId,
  };

  const [input, setInput] = useState(initialInput);
  const [error, setError] = useState({});

  const isReadOnly = !input.status;

  function checkSameValue(input, value) {
    if (Object.keys(input).some((key) => input[key] !== value[key])) {
      return false;
    }
    return true;
  }

  const handleUpdateOrder = async () => {
    try {
      const updatedOrder = {
        ...order,
        price: input.price,
        status: input.status,
        description: input.description,
        rate: agentRate.rate,
        percent: agentRate.percent,
      };

      if (checkSameValue(input, order)) {
        console.log("same value");
        onSuccess();
        setError(null);
        return;
      }

      if (updatedOrder.status) {
        await orderApi.deleteCancelOrder(updatedOrder.id);
      } else {
        const res = await orderApi.createCancelOrder(updatedOrder);
        console.log(res);
        if (res.response) {
          const error = res.response.data;
          onSuccess();
          throw error;
        }
        onSuccess();
      }
      const result = await orderApi.updateOrder(updatedOrder);
      const updateOrder = result.data.order;

      onUpdateOrder(updateOrder);
      onSuccess();
      setError(null); // Clear the error on success
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  return (
    <>
      {error && (
        <div className="text-center text-red-500">
          <p>{error.errMessage}</p>
        </div>
      )}
      <div className="flex justify-between items-end">
        <div>
          <div className="py-2 flex">
            <p className=" text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Price</p>
            <input
              className="py-1 px-1 border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white"
              type="number"
              name="price"
              value={input.price || ""}
              onChange={(e) => setInput({ ...input, price: e.target.value })}
              disabled={true}
              // disabled={isReadOnly} // ปิดการแก้ไขถ้า input.status เป็น "false"
            />
          </div>
          <div className="py-2 flex">
            <p className="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Status</p>
            <select
              className="py-1 px-1 border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white"
              name="status"
              defaultValue={input.status ? "true" : "false"}
              onChange={(e) => setInput({ ...input, status: e.target.value === "true" })}
            >
              <option value="true">Active</option>
              <option value="false">Cancel</option>
            </select>
          </div>
          <Textarea
            label="Description"
            name="description"
            value={input.description}
            onChange={(e) => setInput({ ...input, description: e.target.value })}
            // readOnly={isReadOnly} // ปิดการแก้ไขถ้า input.status เป็น "false"
          />
        </div>

        <div>
          <Button variant="text" color="blue" size="sm" onClick={handleUpdateOrder}>
            save
          </Button>
        </div>
      </div>
    </>
  );
}
