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
        className={`text-xl py-1 font-semibold border w-38 text-center rounded-sm bg-gray-200 fixed top-9 right-2 ${
          toLogOut ? "visible" : "hidden"
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
