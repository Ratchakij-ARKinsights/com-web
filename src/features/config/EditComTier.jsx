import { Button, Typography } from "@material-tailwind/react";
import React, { useState } from "react";

import * as comTierApi from "../../api/comTier-api";

export default function EditComTier({ comTier, index, onUpdateComTier }) {
  const headerClassName = "w-[7rem] px-1 py-1.5 text-center";
  const bodyClassName = "w-[7rem] rounded-md border px-1 py-1.5 text-center leading-6 outline-none";
  const initialInput = {
    tierLevel: comTier.tierLevel,
    rateStart: comTier.rateStart,
    percent: comTier.percent,
  };
  const [input, setInput] = useState(initialInput);
  const [error, setError] = useState(null); // เพิ่ม state สำหรับการจัดการข้อผิดพลาด

  const handleUpdateComTier = async () => {
    try {
      // สร้างข้อมูลที่จะส่งไปยัง API เพื่ออัปเดต comTier
      const comTierDataToUpdate = {
        id: comTier.id,
        tierLevel: input.tierLevel,
        rateStart: input.rateStart,
        percent: input.percent,
      };

      // เรียก API เพื่ออัปเดต comTier
      const comtier = await comTierApi.updateComtier(comTierDataToUpdate);
      
      onUpdateComTier(comtier.data.comTier);

      // ล้างข้อผิดพลาด (ถ้ามี)
      setError(null);
    } catch (error) {
      // จัดการข้อผิดพลาด
      console.error("เกิดข้อผิดพลาดในการอัปเดต ComTier:", error);
      setError("ไม่สามารถอัปเดต ComTier ได้ในขณะนี้");
    }
  };

  return (
    <div>
      {index === 0 && (
        <div className=" flex flex-row">
          <div className={headerClassName}>
            <h1>Tier Level</h1>
          </div>
          <div className={headerClassName}>
            <h1>Rate Start</h1>
          </div>
          <div className={headerClassName}>
            <h1>Percent</h1>
          </div>
        </div>
      )}
      <div className=" flex flex-row">
        <Typography className={bodyClassName} color="blue-gray">
          {comTier.tierLevel}
        </Typography>

        <input
          className={bodyClassName}
          type="text"
          name="rateStart"
          value={input.rateStart}
          onChange={(e) => setInput({ ...input, rateStart: e.target.value })}
        />

        <input
          className={bodyClassName}
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
