import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { reset } from "../redux/userSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <div className="fixed top-0 w-full border-b bg-[#1A202C] z-10 shadow-2xl text-white">
      <div className="flex flex-row justify-around px-4 py-5 border-b-3 border-black">
        <div className="">
          <Link to="/">
            <h1 className="text-lg">L.M.S</h1>
          </Link>
        </div>
        {user && (
          <div className="flex items-center space-x-6 sm:mr-5">
            <div className="cursor-pointer flex flex-row md:text-lg space-x-9">
              <p className="hidden md:block">{user.role}</p>
              {user.role === "Employee" && (
                <Link to="/employee/request-list">
                  <p>Request List</p>
                </Link>
              )}
              <button
                className="hover:bg-red-600 hover:px-2 rounded text-red-600 hover:text-white"
                onClick={handleClick}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
