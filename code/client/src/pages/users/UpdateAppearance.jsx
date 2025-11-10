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
import ProfilePic from "../../components/common/ProfilePic.jsx";

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
        <ProfileCard
          styles="flex-col gap-2 sm:ml-15 md:w-130"
          dimensions="w-full h-auto sm:w-80"
        >
          <h1 className="text-lg font-semibold text-gray-800 md:text-2xl lg:text-3xl">
            Your current profile pic:{" "}
          </h1>
          <ProfilePic
            profileStyles={"w-36 h-36 rounded-full"}
            dummyStyles={"w-36 h-36 border border-blue-900"}
            dummyDimensions={"text-5xl"}
          />
          <label htmlFor="profilePic" className="text-md lg:text-lg">
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
            styles="text-xl rounded-3xl p-5 bg-blue-900 hover:bg-blue-800 mt-2 md:text-2xl md:p-6"
          />
        </ProfileCard>
        {conditionalMessage()}
      </MainSection>
    </>
  );
}

export default UpdateAppearance;
