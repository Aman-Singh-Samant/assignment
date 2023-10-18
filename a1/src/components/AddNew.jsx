import { useContext, createContext, useState, useEffect } from "react";
import DateSelect from "./addNew/DateSelect";
import ExcludeDate from "./addNew/ExcludeDate";
import dayjs from "dayjs";

//This component receives your chosen date library's adapter (date-fns here) and makes it accessible to all the Date and Time Pickers component using React context.
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const AddNew = () => {
  //defining props and states
  const [startDate, setStartDate] = useState(dayjs().subtract(100, "year"));
  const [endDate, setEndDate] = useState(dayjs().add(100, "year"));
  const [dateDiff, setDateDiff] = useState(0);
  const [excludeDates, setExcludeDates] = useState([]);
  const [leads, setLeads] = useState(0);
  const [expectedLeads, setExpectedLeads] = useState(0);
  const [disDate, setDisDate] = useState(0);
  const [error, setError] = useState(null);

  //used to set dateDiff and expectedLeads useState
  useEffect(() => {
    // excludeDates.map((d) => {
    //   console.log(d.newValue.format("MM/DD/YYYY"),"aaa");
    // });

    // if is not required to setDateDiff(maybe)
    if (startDate != null && endDate != null) {
      setDateDiff(endDate.diff(startDate, "day") + 1 - excludeDates.length);
    }
    setExpectedLeads(leads / dateDiff);
  });

  //on click fun. of "Add new" button
  const onClickHandle = () => {
    document.getElementById("f1").style.display = "block";
    console.log("hidden");
  };

  // on input fun. of leads input
  const onInputHandle = () => {
    const v = document.getElementById("i1").value;
    if (v < 0) document.getElementById("i1").value = "0";
    setLeads(v);
    // const a =sendData
    // console.log("sss",a.startDate)
  };

  //this function submits the form values
  const handleSubmit = async (e) => {
    e.preventDefault(); //prevents refresher/rerender of page on submit
    try {
      const a = excludeDates.map((d) => d.newValue.format("MM/DD/YYYY"));
      const res = await fetch("https://assignment-api-five.vercel.app/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate: startDate.format("MM/DD/YYYY"),
          endDate: endDate.format("MM/DD/YYYY"),
          excludeDates: a.toString(),
          numberOfDays: dateDiff,
          leadCount: leads,
          expDRR: expectedLeads,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        //data.success is the json key defined in index
        //this might be never used cause of catch block
        setError(data.message);
        return;
      }
      window.location.reload();
      setError(null);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
    
  };

  return (
    <div className="items-center justify-center">
      <button
        className="bg-blue-300 text-white rounded-lg p-1 px-2  relative top-1 left-2 z-10"
        onClick={onClickHandle}
      >
        Add New
      </button>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="hidden bg-white p-3 m-auto rounded-xl " id="f1">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-start m-1 p-1 "
          >
            <DateSelect
              setDisDate={setDisDate}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              disDate={disDate}
              setEndDate={setEndDate}
            />
            <ExcludeDate
              disDate={disDate}
              startDate={startDate}
              endDate={endDate}
              excludeDates={excludeDates}
              setExcludeDates={setExcludeDates}
            />
            <div className="flex flex-col m-2">
              <label htmlFor="i1" className=" text-lg my-2">
                Lead Count : 
              </label>
              <input
                className="bg-slate-100 p-1 focus:outline-none rounded-lg"
                type="number"
                id="i1"
                placeholder="00"
                min={0}
                // onkeypress={value.charCode >= 48}
                onInput={onInputHandle}
              />
            </div>

            <button
              disabled={!(disDate > 1)}
              type="submit"
              className="bg-green-400 text-white rounded-lg p-1 px-3 m-2 mt-5 disabled:bg-gray-400 disabled:hover:cursor-not-allowed"
            >
              Submit
            </button>
          </form>
          {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
      </LocalizationProvider>
    </div>
  );
};

export default AddNew;
