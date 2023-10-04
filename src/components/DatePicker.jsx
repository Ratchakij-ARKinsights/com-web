import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CustomDatePicker({ selected, onChange, placeholderText }) {
  return (
    <DatePicker
      className="h-[2rem]"
      selected={selected}
      onChange={onChange}
      placeholderText={placeholderText}
      dateFormat="MM-yyyy"
      showMonthYearPicker
      isClearable
      onKeyDown={(e) => {
        e.preventDefault();
      }}
    />
  );
}

export default CustomDatePicker;
