import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus, getLeave } from "../redux/leaveSlice";
import moment from "moment";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";

const LeaveDetail = () => {
  const { leave, isLoading } = useSelector((state) => state?.leave);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getLeave(id));
  }, [getLeave, id]);

  const handleAccept = () => {
    const data = {
      id,
      status: "Accepted",
    };
    dispatch(changeStatus(data));
    navigate("/hr");
  };

  const handleReject = () => {
    const data = {
      id,
      status: "Rejected",
    };
    dispatch(changeStatus(data));
    navigate("/hr");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="w-full h-screen flex justify-center m-auto mt-8">
        <div className="max-w-xl w-full bg-gray-100 p-10">
          <h1 className="text-center text-4xl m-10">
            Leave requests detail Page
          </h1>
          <p className="px-4 py-2">
            Status: <span>{leave?.status}</span>
          </p>
          <p className="px-4 py-2">
            Name: <span>{leave?.userId?.name}</span>
          </p>
          <p className="px-4 py-2">
            Male: <span> {leave?.userId?.gender}</span>
          </p>
          <p className="px-4 py-2">
            userId: <span>{leave?.userId?.userId}</span>
          </p>
          <p className="px-4 py-2">Requested Leave: {leave?.leaveDays}</p>
          <p className="px-4 py-2">
            From Date: {moment(leave?.startDate).format("MMMM d, YYYY")}
          </p>
          <p className="px-4 py-2">
            To Date: {moment(leave?.endDate).format("MMMM d, YYYY")}
          </p>
          <div className="flex flex-row justify-center my-4 space-x-12">
            <div className="">
              <button
                className="mt-10 p-3 w-36 bg-green-500 text-white hover:bg-green-700 shadow-lg"
                onClick={handleAccept}
              >
                Accept
              </button>
            </div>
            <div>
              <button
                className="mt-10 p-3 w-36 bg-red-500 text-white hover:bg-red-700"
                onClick={handleReject}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveDetail;
