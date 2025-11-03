import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  // If user is not logged in, redirect to homepage
  if (!isAuthenticated) {
    return <Navigate to="/api/v1" state={{ from: location }} replace />;
  }

  // If logged in, render the requested route
  return <Outlet />;
};

export default ProtectedRoute;
