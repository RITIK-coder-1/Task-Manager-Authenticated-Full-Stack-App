/* ---------------------------------------------------------------------------
UpdatePassword.jsx
This is the page to update the password
------------------------------------------------------------------------------ */

import React, { useState } from "react";
import {
  AuthCard,
  Input,
  Button,
  MainSection,
  InputCard,
} from "../../components/index.components";
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
      <MainSection styles="pt-22 pb-3">
        <AuthCard onSubmit={handleSubmit}>
          {/* The old password */}
          <InputCard
            label="Enter Old Password: "
            name={"oldPassword"}
            method={setOldPassword}
            placeholder="Old Password"
            type="password"
          />

          {/* The new password */}
          <InputCard
            label="Enter New Password: "
            name={"newPassword"}
            method={setNewPassword}
            placeholder="New Password"
            type="password"
          />

          {/* The update button */}
          <Button
            content={"Update"}
            type={"submit"}
            width="w-full"
            bgColor="bg-blue-900 hover:bg-blue-800"
          />
        </AuthCard>
        {/* The conditional message */}
        {conditionalMessage()}
      </MainSection>
    </>
  );
}

export default UpdatePassword;
