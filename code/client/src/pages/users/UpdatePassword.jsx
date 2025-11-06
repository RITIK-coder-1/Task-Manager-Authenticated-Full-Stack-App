/* ---------------------------------------------------------------------------
UpdatePassword.jsx
This is the page to update the password
------------------------------------------------------------------------------ */

import React, { useState } from "react";
import { AuthCard, Input, Button } from "../../components/index.components";
import { passwordUpdate } from "../../features/userSlice.js";
import { useDispatch } from "react-redux";
import useConditionalRendering from "../../hooks/useConditionalRendering.js";

function UpdatePassword() {
  // ----------------------------------------------------------------------------------
  // All the variables of the script
  // ----------------------------------------------------------------------------------
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const { status, error } = useConditionalRendering("users");
  const dispatch = useDispatch();

  // ----------------------------------------------------------------------------------
  // The function to dispatch the action
  // ----------------------------------------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    const payload = {
      newPassword: newPassword,
      oldPassword: oldPassword,
    };
    dispatch(passwordUpdate(payload));
  };

  // ----------------------------------------------------------------------------------
  // The conditional message
  // ----------------------------------------------------------------------------------
  const conditionalMessage = () => {
    if (status === "pending") {
      return <span>Checking...</span>;
    } else if (status === "succeeded") {
      return <span>Your password has been updated!</span>;
    } else if (status === "failed") {
      return <span>{error}</span>;
    }
  };

  return (
    <>
      {/* The auth form */}
      <AuthCard onSubmit={handleSubmit}>
        {/* The old password */}
        <div className="flex gap-2">
          <label>Enter your old password: </label>
          <Input
            placeholder={"old password"}
            name={"oldPassword"}
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
          />
        </div>
        {/* The new password */}
        <div className="flex gap-2">
          <label>Enter your new password: </label>
          <Input
            placeholder={"Minimum 10 characters"}
            name={"newPassword"}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
        </div>
        {/* The update button */}
        <Button content={"Update"} type={"submit"} />
      </AuthCard>

      {/* The conditional message */}
      {conditionalMessage()}
    </>
  );
}

export default UpdatePassword;
