import { Button, Typography } from "@material-tailwind/react";
import React, { useState } from "react";

import * as comTierApi from "../../api/comTier-api";

export default function EditLeadComTier({ item, index, leadComTier, onUpdateLeadComTier }) {
  console.log(leadComTier);
  const initialInput = {
    title: item.title,
    percent: item.percent,
  };
  const [input, setInput] = useState(initialInput);
  const [error, setError] = useState(null);
  // console.log(input);

  const comTierDataToUpdate = {
    id: item.id,
    percent: item.percent,
  };

  const handleUpdateLeadComTier = async () => {
    try {
      if (input.percent == comTierDataToUpdate.percent) {
        console.log(input);
        console.log(comTierDataToUpdate);
        return;
      }

      const updatedComtier = {
        ...comTierDataToUpdate,
        percent: input.percent,
      };

      const response = await comTierApi.updateLeadComtier(updatedComtier);
      console.log(response.data.leadComTier);
      onUpdateLeadComTier(response.data.leadComTier);

      setError(null); // Clear the error on success
    } catch (err) {
      console.error(err);
      setError("Unable to update ComTier at this time.");
    }
  };

  return (
    <div>
      <div className="flex flex-row"></div>

      <div className="flex flex-row">
        <div className="w-[7rem] px-1 py-1.5 text-center">
          <h1>{item.title}</h1>
        </div>
        <input
          className="w-[7rem] rounded-md border px-1 py-1.5 text-center leading-6 outline-none"
          type="number"
          name="percent"
          value={input.percent}
          onChange={(e) => setInput({ ...input, percent: e.target.value })}
        />
        %
        <Button variant="text" color="blue" size="sm" onClick={handleUpdateLeadComTier}>
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
