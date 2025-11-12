/* ---------------------------------------------------------------------------
UpdateAppearance.jsx
This is the page to update the profile pic
------------------------------------------------------------------------------ */

import React, { useState } from "react";
import {
  Button,
  MainSection,
  ProfileCard,
  ProfilePic,
} from "../../components/index.components";
import { useDispatch } from "react-redux";
import { profileUpdate } from "../../features/userSlice.js";
import { useConditionalRendering } from "../../hooks/index.hooks.js";

function UpdateAppearance() {
  // ----------------------------------------------------------------------------------
  // All the variables of the script
  // ----------------------------------------------------------------------------------
  const dispatch = useDispatch();

  // As the details of the user have already been fetched by the header, I don't need to do it again
  const { user } = useConditionalRendering("users");
  const [profile, setProfile] = useState(null);

  // ----------------------------------------------------------------------------------
  // The function to dispatch the action
  // ----------------------------------------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    const payload = new FormData();
    payload.append("profilePic", profile);

    dispatch(profileUpdate(payload));
  };

  return (
    <>
      {/* The main section */}
      <MainSection styles="pt-22 pb-3">
        <ProfileCard
          styles="flex-col gap-2 sm:ml-15 md:w-130"
          dimensions="w-full h-auto sm:w-80"
        >
          {/* The current profile pic */}
          <h1 className="text-lg font-semibold text-gray-800 md:text-2xl lg:text-3xl">
            {user?.profilePic === ""
              ? "No Profile Pic"
              : "Your current profile pic:"}
          </h1>
          <ProfilePic
            profileStyles={"w-36 h-36 rounded-full"}
            dummyStyles={"w-36 h-36 border border-blue-900"}
            dummyDimensions={"text-5xl"}
          />

          {/* Choosing a pic */}
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
      </MainSection>
    </>
  );
}

export default UpdateAppearance;
