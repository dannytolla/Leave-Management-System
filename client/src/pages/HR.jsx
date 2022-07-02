import React, { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { getLeaveRequests } from "../redux/leaveSlice";
import { Link } from "react-router-dom";

const HR = () => {
  const { leaves, isLoading } = useSelector((state) => state?.leave);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLeaveRequests());
  }, []);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="w-full h-screen flex justify-center m-auto ">
      <div className="max-w-4xl bg-gray-100 w-full p-10 mt-8">
        <h1 className="text-center text-4xl m-10">HR Manager Page</h1>
        <h1 className="text-center text-2xl m-10">Leave Request List</h1>
        {leaves?.length < 1 && (
          <>
            <h1 className="text-center text-xl text-gray-500">
              No Request found
            </h1>
          </>
        )}
        <List sx={{ width: "100%" }}>
          {leaves?.map((leave, index) => (
            <ListItem
              key={index}
              disableGutters
              secondaryAction={
                <Link to={`/hr/${leave?._id}`} className="">
                  <button className="p-3 text-blue-600 font-semibold py-1 px-3 bg-white outline md:px-10">
                    View Detail
                  </button>
                </Link>
              }
            >
              <ListItemText primary={`${++index}. ${leave?.userId?.name}`} />
              <ListItemText primary={`${++index}. ${leave?.userId?.gender}`} />
              <ListItemText primary={` ${leave?.type}`} />
              <ListItemText primary={` ${leave?.status}`} />
              <ListItemText />
              {/* <ListItemText primary={`Line New ${value}`} /> */}
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default HR;
