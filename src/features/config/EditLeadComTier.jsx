import { Button, Typography } from "@material-tailwind/react";
import React, { useState } from "react";

import * as comTierApi from "../../api/comTier-api";

export default function EditLeadComTier({ item, index, leadComTier, onUpdateLeadComTier }) {
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
    <>
      <div className="px-14 flex flex-row justify-between items-center">
        <div className="w-[8rem]">
          <h1>{item.title}</h1>
        </div>
        <div className="flex gap-2">
          <input
            style={{ width: "50px", textAlign: "center", border: "1px solid gray" }}
            type="number"
            name="percent"
            value={input.percent}
            onChange={(e) => setInput({ ...input, percent: e.target.value })}
          />
          <h1>%</h1>
        </div>
        <div>
          <Button variant="text" color="blue" size="sm" onClick={handleUpdateLeadComTier}>
            save
          </Button>
        </div>
      </div>
      {error && (
        <div className="text-red-500 mt-2">
          <p>{error}</p>
        </div>
      )}
    </>
  );
}
