import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { createLeaveRequest } from "../redux/leaveSlice";
import { getMe } from "../redux/userSlice";
import Spinner from "./Spinner";

const LeaveForm = () => {
  const [leaveDays, setLeaveDays] = useState("");
  const [type, setType] = useState("");
  const [value, setValue] = useState(new Date());

  const { data, isLoading } = useSelector((state) => state?.user);

  useEffect(() => {
    dispatch(getMe());
  }, [getMe]);

  function addDays(date, leaveDays, weekend = 0) {
    const copy = new Date(Number(date));
    if (weekend > 0) {
      let total = leaveDays + weekend;
      copy.setDate(date.getDate() + total);
    } else copy.setDate(date.getDate() + leaveDays);
    return copy;
  }

  let endDate = leaveDays && addDays(value, +leaveDays);

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (isError) {
  //     toast.error(errorMessage);
  //   }
  // }, [isError]);

  let maxDay = 0;

  if (type && type === "Sick Leave") {
    maxDay = data?.sickLeave;
  } else if (type === "Casual Leave") {
    maxDay = data?.casualLeave;
  } else if (type === "Maternity Leave") {
    maxDay = data?.maternityLeave;
  } else if (type === "Paternity Leave") {
    maxDay = data?.paternity;
  } else if (type === "Legal Leave") {
    maxDay = data?.legalLeave;
  }

  function isWeekend(date1, date2) {
    let d1 = new Date(date1);
    let d2 = new Date(date2);
    let isWeekend = false;
    let count = 0;

    while (d1 < d2) {
      var day = d1.getDay();
      isWeekend = day == 6 || day == 0;
      if (isWeekend) {
        ++count;
      }
      d1.setDate(d1.getDate() + 1);
    }
    return count;
  }
  if (type && type === "Casual Leave") {
    let weekend = isWeekend(value, endDate);
    endDate = addDays(value, +leaveDays, weekend);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    let success = true;

    if (+maxDay < +leaveDays) {
      success = false;
      toast.error(
        `Insufficient  Balance.  Remaining Balance is ${maxDay} days`
      );
    }

    const leaveForm = {
      leaveDays,
      type,
      startDate: value,
      endDate,
    };

    if (success) {
      dispatch(createLeaveRequest(leaveForm));
      toast.success("Leave Request Created");
      navigate("/");
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-full h-screen flex items-center justify-center m-auto p-2">
      <div className="max-w-md w-full m-auto mt-28 p-5 bg-white border rounded shadow-2xl">
        <h2 className="font-medium text-center p-4 text-4xl">
          Leave Request Form
        </h2>
        <form className="pt-5 w-full mb-8" onSubmit={onSubmit}>
          <div className="my-6">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Leave Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                required
                label="Leave Type"
                onChange={handleChange}
              >
                <MenuItem value={"Sick Leave"}>Sick Leave</MenuItem>
                <MenuItem value={"Casual Leave"}>Casual Leave</MenuItem>
                {data?.gender === "Female" ? (
                  <MenuItem value={"Maternity Leave"}>Maternity Leave</MenuItem>
                ) : (
                  <MenuItem value={"Paternity Leave"}>Paternity Leave</MenuItem>
                )}
                <MenuItem value={"Legal Leave"}>Legal Leave</MenuItem>
              </Select>
            </FormControl>
          </div>
          <label className="my-4 py-3 mb-10 text-gray-500">Leave Days</label>
          <input
            id="leaveDays"
            type="number"
            name="leaveDays"
            value={leaveDays}
            // max={maxDay}
            min={1}
            required
            onChange={(e) => {
              setLeaveDays(e.target.value);
            }}
            className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200 mb-6"
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="mb-4">
              <MobileDatePicker
                disablePast
                inputFormat="dd/MM/yyyy"
                label="Start Date"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <div className="my-4">
              <MobileDatePicker
                label="End Date"
                inputFormat="dd/MM/yyyy"
                readOnly
                value={endDate}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
          </LocalizationProvider>

          <button
            type="submit"
            className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600 active:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeaveForm;
