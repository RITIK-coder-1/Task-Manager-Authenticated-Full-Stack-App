/* ---------------------------------------------------------------------------
UpdateAppearance.jsx
This is the page to update the profile pic
------------------------------------------------------------------------------ */

import React, { useEffect, useState } from "react";
import {
  Button,
  MainSection,
  ProfileCard,
} from "../../components/index.components";
import { useDispatch, useSelector } from "react-redux";
import { get, profileUpdate } from "../../features/userSlice.js";
import useConditionalRendering from "../../hooks/useConditionalRendering.js";

function UpdateAppearance() {
  // ----------------------------------------------------------------------------------
  // Get the user details as the page loads for displaying the current pic for UX
  // ----------------------------------------------------------------------------------
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get());
  }, []);

  // ----------------------------------------------------------------------------------
  // All the variables of the script
  // ----------------------------------------------------------------------------------
  const user = useSelector((state) => state.users.user?.message);
  const { status, error } = useConditionalRendering("users");
  const [profile, setProfile] = useState(null);

  // ----------------------------------------------------------------------------------
  // The function to dispatch the action
  // ----------------------------------------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    const payload = new FormData();
    payload.append("profilePic", profile);
    console.log(profile);

    dispatch(profileUpdate(payload));
  };

  // ----------------------------------------------------------------------------------
  // The conditional message
  // ----------------------------------------------------------------------------------
  const conditionalMessage = () => {
    if (status === "pending") {
      return <span>Checking...</span>;
    } else if (status === "succeeded") {
      return <span>Your profile pic has been updated!</span>;
    } else if (status === "failed") {
      return <span>{error}</span>;
    }
  };

  return (
    <>
      <MainSection styles="pt-22">
        <ProfileCard styles="flex-col gap-2" dimensions="w-full h-auto">
          <h1 className="text-lg font-semibold text-gray-800">
            Your current profile pic:{" "}
          </h1>
          <img
            src={user?.profilePic}
            className="w-36 h-36 rounded-full transition-all duration-300"
          />
          <label htmlFor="profilePic" className="text-md">
            Choose a new pic:{" "}
          </label>
          <input
            type="file"
            className="cursor-pointer shadow-md w-50 rounded-md p-2 text-sm bg-gray-200 hover:bg-gray-300"
            name="profilePic"
            id="profilePic"
            onChange={(e) => {
              setProfile(e.target.files[0]);
            }}
          />
          <Button
            content={"Update"}
            onClick={handleSubmit}
            styles="text-xl rounded-3xl p-5 bg-blue-900 hover:bg-blue-800 mt-2"
          />
        </ProfileCard>
        {conditionalMessage()}
      </MainSection>
    </>
  );
}

export default UpdateAppearance;
