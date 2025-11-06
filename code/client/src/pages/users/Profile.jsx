/* ---------------------------------------------------------------------------
Profile.jsx
This is the profile section of the user. The user can delete their profile here. 
------------------------------------------------------------------------------ */

import React, { useEffect, useState } from "react";
import { getUser } from "../../features/index.features";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/index.components";
import { Link } from "react-router-dom";

function Profile() {
  // ----------------------------------------------------------------------------------
  // All the variables of the script
  // ----------------------------------------------------------------------------------
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user?.message);

  // ----------------------------------------------------------------------------------
  // The user details should be displayed as soon as the component mounts
  // ----------------------------------------------------------------------------------
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  // ----------------------------------------------------------------------------------
  // The profile should be displayed based on this condition
  // ----------------------------------------------------------------------------------

  const conditionalMessage = () => {
    if (user) {
      return (
        <div className="flex flex-col items-start justify-center gap-2">
          <img src={user?.profilePic} className="w-36 h-36 rounded-full" />
          <span>
            Your Name:{" "}
            {`${user?.fullName?.firstName} ${user?.fullName?.lastName}`}
          </span>
          <span>Your Username: {user?.username}</span>
          <span>Your Email: {user?.email}</span>
        </div>
      );
    } else {
      return <span>You're unauthorized!</span>;
    }
  };

  return (
    <>
      {conditionalMessage()}

      {/*  ----------------------------------------------------------------------------------
          The links to update the profile
       ---------------------------------------------------------------------------------- */}
      <Link to={"/users/me/details"} className="cursor-pointer">
        <Button content={"Update details"} />
      </Link>
      <Link to={"/users/me/password"} className="cursor-pointer">
        <Button content={"Update password"} />
      </Link>
      <Link to={"/users/me/appearance"} className="cursor-pointer">
        <Button content={"Update profile"} />
      </Link>
    </>
  );
}

export default Profile;
