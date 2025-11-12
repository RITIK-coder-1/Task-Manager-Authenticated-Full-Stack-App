/* ---------------------------------------------------------------------------
UpdatePassword.jsx
This is the page to update the password
------------------------------------------------------------------------------ */

import {
  AuthCard,
  Button,
  MainSection,
  InputCard,
} from "../../components/index.components";
import { passwordUpdate } from "../../features/userSlice.js";
import { useDispatch } from "react-redux";
import { useState } from "react";

function UpdatePassword() {
  // ----------------------------------------------------------------------------------
  // All the variables of the script
  // ----------------------------------------------------------------------------------
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
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
            value={oldPassword}
          />

          {/* The new password */}
          <InputCard
            label="Enter New Password: "
            name={"newPassword"}
            method={setNewPassword}
            placeholder="New Password"
            type="password"
            value={newPassword}
          />

          {/* The update button */}
          <Button
            content={"Update"}
            type={"submit"}
            width="w-full"
            bgColor="bg-blue-900 hover:bg-blue-800"
          />
        </AuthCard>
      </MainSection>
    </>
  );
}

export default UpdatePassword;
