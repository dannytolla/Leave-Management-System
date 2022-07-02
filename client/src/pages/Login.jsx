import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Spinner from "../components/Spinner";
import { login, reset } from "../redux/authSlice";

const Login = () => {
  const [userId, setUserId] = useState("");

  const { user, isLoading, isError, errorMessage } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
    }

    if (user) {
      user.role === "Employee" ? navigate("/") : navigate("/hr");
    }

    dispatch(reset());
  }, [isError, user, dispatch, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(login(userId));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-full h-screen flex items-center justify-center m-auto p-2">
      <div className="max-w-md w-full m-auto mt-28 p-5 bg-white border rounded shadow-2xl">
        <h2 className="font-medium text-center p-4 text-4xl">Login</h2>
        <form className="pt-5  w-full mb-8" onSubmit={onSubmit}>
          <label className="my-4 py-3 mb-10 text-gray-500">User Id</label>
          <input
            id="userId"
            type="text"
            name="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200 mb-6"
          />
          <button
            type="submit"
            className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600 active:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
