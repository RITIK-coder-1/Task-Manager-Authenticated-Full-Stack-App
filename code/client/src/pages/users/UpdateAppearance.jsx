/* ---------------------------------------------------------------------------
UpdateAppearance.jsx
This is the page to update the profile pic
------------------------------------------------------------------------------ */

import React, { useEffect, useState } from "react";
import { Button } from "../../components/index.components";
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
      <span>Your current profile pic: </span>
      <img src={user?.profilePic} className="w-36 h-36 rounded-full" />
      <label>Choose a new pic: </label>
      <input
        type="file"
        className="border border-solid border-black cursor-pointer block"
        name="profilePic"
        onChange={(e) => {
          setProfile(e.target.files[0]);
        }}
      />
      <Button content={"Update"} onClick={handleSubmit} />
      {conditionalMessage()}
    </>
  );
}

export default UpdateAppearance;
