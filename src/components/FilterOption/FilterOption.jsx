import React from "react";
import DatePicker from "react-datepicker";

export const CustomeDatePicker = (props) => {
  return (
    <DatePicker
      selected={props.time}
      customInput={
        <input
          className="form-control"
          style={{ width: 100, height: 30, borderRadius: 0 }}
        />
      }
      onChange={props.change}
      dateFormat="MM/dd/yyyy"
    />
  );
};

// export const FilterOption
