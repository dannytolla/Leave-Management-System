import React, { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { getLeaveRequests } from "../redux/leaveSlice";
import { Link } from "react-router-dom";
import Table from "../components/Table";

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
    <>
      <div className="w-full h-screen flex items-center justify-center m-auto p-2">
        <div className="w-full m-auto mt-28 p-5 bg-white border rounded shadow-2xl">
          <h1 className="text-2xl text-center">Request Leave List</h1>
          <Table>
            {leaves?.map((leave, index) => (
              <tr
                className="border-b odd:bg-white even:bg-gray-100 border-gray-50"
                key={index}
              >
                <td className="py-4 px-6 text-sm">{++index}</td>
                <td className="py-4 px-6 text-sm">{leave.userId.name}</td>
                <td className="py-4 px-6 text-sm whitespace-nowrap">
                  {leave.type}
                </td>
                <td className="py-4 px-6 text-sm whitespace-nowrap">
                  {leave.status}
                </td>
                <td>
                  <Link to={`/hr/${leave?._id}`} className="">
                    <button className="p-3 text-blue-600 font-semibold py-1 px-3 bg-white outline md:px-10">
                      View Detail
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </Table>
        </div>
      </div>
    </>
  );
};

export default HR;
