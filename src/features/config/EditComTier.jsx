import { Button, Typography } from "@material-tailwind/react";
import React, { useState } from "react";

import * as comTierApi from "../../api/comTier-api";

export default function EditComTier({ comTier, index, onUpdateComTier }) {
  const initialInput = {
    rateStart: comTier.rateStart,
    percent: comTier.percent,
  };
  const [input, setInput] = useState(initialInput);
  const [error, setError] = useState(null);
  // console.log(input);
  const comTierDataToUpdate = {
    id: comTier.id,
    rateStart: comTier.rateStart,
    percent: comTier.percent,
  };

  const handleUpdateComTier = async () => {
    try {
      if (input.rateStart == comTierDataToUpdate.rateStart && input.percent == comTierDataToUpdate.percent) {
        console.log(input);
        console.log(comTierDataToUpdate);
        return;
      }

      const updatedComtier = {
        ...comTierDataToUpdate,
        rateStart: input.rateStart,
        percent: input.percent,
      };

      console.log(input);
      console.log(comTierDataToUpdate);
      console.log(updatedComtier);

      const response = await comTierApi.updateComtier(updatedComtier);

      onUpdateComTier(response.data.comTier);

      setError(null); // Clear the error on success
    } catch (err) {
      console.error(err);
      setError("Unable to update ComTier at this time.");
    }
  };

  return (
    <div>
      {index === 0 && (
        <div className="flex flex-row">
          <div className="w-[7rem] px-1 py-1.5 text-center">
            <h1>Tier Level</h1>
          </div>
          <div className="w-[7rem] px-1 py-1.5 text-center">
            <h1>Rate Start</h1>
          </div>
          <div className="w-[7rem] px-1 py-1.5 text-center">
            <h1>Percent</h1>
          </div>
        </div>
      )}
      <div className="flex flex-row">
        <Typography
          className="w-[7rem] rounded-md border px-1 py-1.5 text-center leading-6 outline-none"
          color="blue-gray"
        >
          {comTier.tierLevel}
        </Typography>

        <input
          className="w-[7rem] rounded-md border px-1 py-1.5 text-center leading-6 outline-none"
          type="text"
          name="rateStart"
          value={input.rateStart}
          onChange={(e) => setInput({ ...input, rateStart: e.target.value })}
        />

        <input
          className="w-[7rem] rounded-md border px-1 py-1.5 text-center leading-6 outline-none"
          type="text"
          name="percent"
          value={input.percent}
          onChange={(e) => setInput({ ...input, percent: e.target.value })}
        />
        <Button variant="text" color="blue" size="sm" onClick={handleUpdateComTier}>
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
