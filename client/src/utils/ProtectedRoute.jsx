/* ---------------------------------------------------------------------------
ProtectedRoute.jsx
This is a special component that wraps all the secured roots for routing
------------------------------------------------------------------------------ */

import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Header } from "../components/index.components";

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  // If user is not logged in, redirect to the homepage
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  } else {
    // If logged in, render the requested route
    return (
      <>
        {/* 1. The Header component appears here, above all content */}
        <Header />

        {/* 2. The Outlet renders the specific nested page (Dashboard, Profile, etc.) */}
        <Outlet />
      </>
    );
  }
};

export default ProtectedRoute;
