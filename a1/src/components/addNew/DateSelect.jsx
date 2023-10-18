import { useState, useEffect, useContext, createContext } from "react";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const UserContext = createContext();

const DateSelect = ({startDate, setStartDate, endDate, setEndDate, setDisDate, disDate}) => {
  dayjs.extend(customParseFormat);
  
//testing   
  // useEffect(() => {
  //   console.log(startDate);
  // },);
  
  return (
    <div className=" flex max-md:flex-col">
      <div className="m-2  flex flex-col">
        <label className=" text-lg my-2"> Enter Start Date : </label>
        <DatePicker
          id="sd"
          className="pl-5 w-72"
          label="Start Date"
          maxDate={endDate}
          onChange={(newValue) => {
            setStartDate(newValue);
            setDisDate(disDate + 1);
          }}
        />
      </div>

      <div className="m-2 flex flex-col ml-24 max-md:ml-2">
        <label className="text-lg my-2">Enter End Date : </label>
        <DatePicker
          className="pl-5 w-72"
          label="End Date"
          minDate={startDate}
          onChange={(newValue) => {
            setDisDate(disDate + 1);
            setEndDate(newValue);
          }}
        />
      </div>
    </div>
  );
};

export default DateSelect;
