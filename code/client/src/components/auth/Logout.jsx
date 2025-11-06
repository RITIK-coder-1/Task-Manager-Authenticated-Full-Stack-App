/* ---------------------------------------------------------------------------
Logout.jsx
This button logs out a user
------------------------------------------------------------------------------ */

import React from "react";
import { Button } from "../index.components.js";
import { logout } from "../../features/index.features.js";
import { useDispatch } from "react-redux";
import {
  useConditionalRendering,
  useNavigation,
} from "../../hooks/index.hooks.js";

function Logout() {
  // ----------------------------------------------------------------------------------
  // All the variables of the script
  // ----------------------------------------------------------------------------------
  const { status, error } = useConditionalRendering("auth");
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };

  // ----------------------------------------------------------------------------------
  // This is the conditional rendering message based on the status of the state
  // ----------------------------------------------------------------------------------

  const conditionalMessage = () => {
    if (status === "pending") {
      return <span>Working...</span>;
    } else if (status === "succeeded") {
      return <span>Successfully logged out!</span>;
    } else if (status === "failed") {
      return <span>{error}</span>;
    }
  };

  // ----------------------------------------------------------------------------------
  // Once the user logs out, they should automatically be navigated to the homepage
  // ----------------------------------------------------------------------------------
  useNavigation("auth", "/");

  return (
    <>
      <Button content={"Log out"} onClick={onLogout} />
      {conditionalMessage()}
    </>
  );
}

export default Logout;
