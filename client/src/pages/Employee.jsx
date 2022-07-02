import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getMe } from "../redux/userSlice";

const Employee = () => {
  const { data, isLoading } = useSelector((state) => state?.user);
  const { user } = useSelector((state) => state?.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMe());

    if (user.role === "HR_Manager") {
      navigate("/hr");
    }
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-full h-screen flex justify-center m-auto mt-12">
      <div className="max-w-lg w-full bg-gray-100 p-10">
        <h1 className="text-center text-4xl m-10">Employee Page</h1>
        <p>Name: {data?.name}</p>
        <p>Male: {data?.gender}</p>
        <p>userId: {data?.userId}</p>
        <br />
        <p>Sick Leave: {data?.sickLeave}</p>
        <p>Casual Leave: {data?.casualLeave}</p>
        {data?.gender === "Male" ? (
          <p>Paternity Leave: {data?.paternityLeave}</p>
        ) : (
          <p>Maternity Leave: {data?.maternityLeave}</p>
        )}
        <p>Legal Leave: {data?.legalLeave}</p>
        <Link to="/employee/leave-request">
          <button className="mt-10 p-3 bg-blue-500 text-white">
            Request Leave
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Employee;
