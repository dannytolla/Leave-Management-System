import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component }) => {
  const { isAuthenticated, isLoading, user } = useSelector(
    (state) => state.auth
  );

  if (isLoading) return <h1>Loading</h1>;

  if (isAuthenticated || user) return <Component />;
  return <Navigate to="/login" />;
};

export default PrivateRoute;
