import { Button, Textarea, Typography } from "@material-tailwind/react";
import React, { useState } from "react";

import * as comTierApi from "../../api/comTier-api";

export default function EditOrder({ editOrder }) {
  const initialInput = {
    id: editOrder.id,
    price: editOrder.price,
    status: editOrder.status,
    description: editOrder.description,
    agentId: editOrder.agentId,
  };
  const [input, setInput] = useState(initialInput);
  const [error, setError] = useState(null);
  // console.log(input);

  const orderDataToUpdate = {
    id: editOrder.id,
    price: editOrder.price,
    status: editOrder.status,
    description: editOrder.description,
  };

  const handleUpdateOrder = async () => {
    try {
      const updatedOrder = {
        ...editOrder,
        price: input.price,
        status: input.status,
        description: input.description,
      };
      console.log(editOrder);
      console.log(updatedOrder);

      // const response = await comTierApi.updateLeadComtier(updatedOrder);
      // console.log(response.data.leadComTier);
      // onUpdateLeadComTier(response.data.leadComTier);

      setError(null); // Clear the error on success
    } catch (err) {
      console.error(err);
      setError("Unable to update ComTier at this time.");
    }
  };

  return (
    <div className="flex justify-between items-end">
      <div>
        <div className="py-2 flex">
          <p className=" text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Price</p>
          <input
            className="py-1 px-1 border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white"
            type="number"
            name="price"
            value={editOrder.price || ""}
            onChange={(e) => setInput({ ...input, price: e.target.value })}
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
          label="Message"
          name="description"
          value={input.description}
          onChange={(e) => setInput({ ...input, description: e.target.value })}
        />
      </div>

      <div>
        <Button variant="text" color="blue" size="sm" onClick={handleUpdateOrder}>
          save
        </Button>
      </div>
      {error && (
        <div className="text-red-500 mt-2">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
