import { useState, useEffect, useContext, createContext } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const ExcludeDate = ({
  startDate,
  endDate,
  excludeDates,
  setExcludeDates,
  disDate,
}) => {
  //for storing the dates
  const onChangeHandle = (newValue) => {
    //checking and not repeating the same dates
    let f = false;
    excludeDates.map((date) => {
      if (newValue.isSame(date.newValue)) f = true;
    });
    if (f == false) {
      setExcludeDates([...excludeDates, { newValue }]);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="m-2 flex flex-col">
        <label className="text-lg  my-2"> Enter Excluede Date: </label>
        <DatePicker
          className="pl-5 w-72"
          id="dp1"
          label="Exclude Dates"
          disabled={!(disDate > 1)}
          minDate={startDate}
          maxDate={endDate}
          onChange={onChangeHandle}
        />
      </div>
      <div
        className="mx-2 top-0   text-green-500"
        hidden={excludeDates.length == 0 ? true : false}
      >
        {excludeDates.length} Dates Exclueded
      </div>
    </div>
  );
};

export default ExcludeDate;
