import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RequestItem from "../components/RequestItem";
import Table from "../components/Table";
import { getRequests } from "../redux/userSlice";

const LeaveResponseList = () => {
  const { requests } = useSelector((state) => state?.user);

  console.log(requests);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRequests());
  }, [getRequests]);

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center m-auto p-2">
        <div className="w-full m-auto mt-28 p-5 bg-white border rounded shadow-2xl">
          <h1 className="text-2xl text-center">Request Leave List</h1>
          <Table>
            {requests?.map((request, index) => (
              <RequestItem data={request} index={index} key={index} />
            ))}
          </Table>
        </div>
      </div>
    </>
  );
};

export default LeaveResponseList;
