/* ---------------------------------------------------------------------------
Profile.jsx
This is the profile section of the user. The user can delete their profile here. 
------------------------------------------------------------------------------ */

import React, { useEffect, useState } from "react";
import { getUser } from "../../features/index.features";
import { useDispatch, useSelector } from "react-redux";
import { Button, MainSection } from "../../components/index.components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

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
    return (
      // The main section
      <MainSection styles="pt-20 pb-3">
        {/* Only if the user is authenticated */}
        {user ? (
          <section className="w-full h-full flex flex-col items-center justify-center gap-2">
            <h1 className="text-4xl font-bold">My Profile</h1>

            {/* The profile image */}
            <div className="bg-white p-2 flex justify-center items-center w-full h-48 rounded-3xl shadow-md">
              <img
                src={user?.profilePic}
                className="w-36 h-36 rounded-full"
                title="profile"
                alt="Profile Picture"
              />

              <Link
                to={"/users/me/appearance"}
                className="flex justify-center items-center bg-blue-900 w-7 h-7 rounded-full border border-black relative right-9 top-14 cursor-pointer"
                title="update pic"
              >
                <FontAwesomeIcon icon={faPen} className="text-white text-sm" />
              </Link>
            </div>
            <div className="bg-white p-2 flex flex-col justify-start items-center gap-3 w-full h-48 rounded-3xl shadow-md">
              {/* The details */}
              <div className="flex flex-col items-start justify-between">
                <h2 className="text-2xl font-semibold">
                  {`${user?.fullName?.firstName} ${user?.fullName?.lastName}`}
                </h2>
                <h5 className="text-xs text-gray-800">{user?.email}</h5>
                <h5 className="text-[10px] text-gray-800">@{user?.username}</h5>
              </div>
              {/*  ----------------------------------------------------------------------------------
              The links to update the profile
            ---------------------------------------------------------------------------------- */}
              <div className="flex flex-col gap-2">
                <Link to={"/users/me/details"} className="cursor-pointer">
                  <Button
                    content={"Update Details"}
                    styles="rounded-2xl text-sm p-5"
                    bgColor="bg-blue-900 hover:bg-blue-950"
                    width="w-55"
                  />
                </Link>
                <Link to={"/users/me/password"} className="cursor-pointer">
                  <Button
                    content={"Change Password"}
                    styles="rounded-2xl text-sm p-5"
                    bgColor="bg-blue-950 hover:bg-blue-900"
                    width="w-55"
                  />
                </Link>
              </div>
            </div>
          </section>
        ) : (
          <span>You're unauthorized!</span>
        )}
      </MainSection>
    );
  };

  return <>{conditionalMessage()}</>;
}

export default Profile;
