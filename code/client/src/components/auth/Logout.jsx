/* ---------------------------------------------------------------------------
Logout.jsx
This button logs out a user
------------------------------------------------------------------------------ */

import React from "react";
import { logout } from "../../features/index.features.js";
import { useDispatch } from "react-redux";
import { useNavigation } from "../../hooks/index.hooks.js";
import { ToastContainer } from "react-toastify";
import { useNotification } from "../../hooks/index.hooks.js";

function Logout({ toLogOut }) {
  // ----------------------------------------------------------------------------------
  // All the variables of the script
  // ----------------------------------------------------------------------------------
  const dispatch = useDispatch();
  const notifications = useNotification(
    "auth",
    5000,
    false,
    "Logging out...",
    "Successfully logged out!"
  ); // this custom hook returns a function so that I can call it inside a function body (handleOnSubmit)
  const onLogout = () => {
    dispatch(logout());
    notifications(); // the toastify notifications
  };

  // ----------------------------------------------------------------------------------
  // Once the user logs out, they should automatically be navigated to the homepage
  // ----------------------------------------------------------------------------------
  useNavigation("auth", "/");

  return (
    <>
      <button
        className={`text-lg sm:text-xl py-2 px-4 font-semibold border border-blue-200 text-blue-900 bg-white shadow-md rounded-md transition-all duration-300 hover:shadow-lg hover:bg-blue-50 active:scale-95 fixed top-12 right-3 sm:top-14 md:top-16  ${
          toLogOut
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        } cursor-pointer`}
        onClick={onLogout}
      >
        Log out
      </button>
      <ToastContainer />
    </>
  );
}

export default Logout;
