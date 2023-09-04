import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

export default function DatePicker() {
  const [value, setValue] = useState({
    startDate: null ,
    endDate: null 
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  return (
    <div className="flex gap-4">
      <h1>DATE: </h1>
      <Datepicker
        containerClassName="w-72 "
        value={value}
        theme={"light"}
        inputClassName="input input-bordered w-72"
        popoverDirection={"down"}
        toggleClassName="invisible"
        onChange={handleValueChange}
        showShortcuts={true}
        primaryColor={"white"}
      />
      {/* <SelectBox
        options={periodOptions}
        labelTitle="Period"
        placeholder="Select date range"
        containerStyle="w-72"
        labelStyle="hidden"
        defaultValue="TODAY"
        updateFormValue={updateSelectBoxValue}
      /> */}
    </div>
  );
}
