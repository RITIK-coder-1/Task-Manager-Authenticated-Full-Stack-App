/* ---------------------------------------------------------------------------
UpdateDetails.jsx
This is the page to update the details of the profile 
------------------------------------------------------------------------------ */

import React, { useEffect, useState } from "react";
import {
  AuthCard,
  Input,
  Button,
  MainSection,
  InputCard,
} from "../../components/index.components";
import { useDispatch, useSelector } from "react-redux";
import { userUpdate } from "../../features/userSlice.js";
import { getUser } from "../../features/index.features.js";
import useConditionalRendering from "../../hooks/useConditionalRendering.js";

function UpdateDetails() {
  const dispatch = useDispatch();

  // ----------------------------------------------------------------------------------
  // Get the user details as soon as the page loads
  // ----------------------------------------------------------------------------------
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  // ----------------------------------------------------------------------------------
  // All the variables of the script
  // ----------------------------------------------------------------------------------
  const user = useSelector((state) => state.users.user?.message);
  const { status, error } = useConditionalRendering("users");
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);

  // ----------------------------------------------------------------------------------
  // For better UX, I made sure to pre-load the current value of the user details
  // ----------------------------------------------------------------------------------
  useEffect(() => {
    if (user && user.fullName) {
      setFirstName(user.fullName.firstName || "");
      setLastName(user.fullName.lastName || "");
      setEmail(user.email || "");
      setUsername(user.username || "");
    }
  }, [user, dispatch, setFirstName, setLastName, setEmail, setUsername]);

  // ----------------------------------------------------------------------------------
  // Function to dispatch the action
  // ----------------------------------------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reloads

    // If some data is not updated, send the current data
    const updatedData = {
      fullName: {
        firstName: firstName ?? user?.fullName?.firstName,
        lastName: lastName ?? user?.fullName?.lastName,
      },
      email: email ?? user?.email,
      username: username ?? user?.username,
    };

    dispatch(userUpdate(updatedData));
  };

  // ----------------------------------------------------------------------------------
  // Loading the user data for UX
  // ----------------------------------------------------------------------------------
  if (!user && status === "pending") {
    return <AuthCard>Loading user data...</AuthCard>;
  }

  // ----------------------------------------------------------------------------------
  // The conditional message
  // ----------------------------------------------------------------------------------
  const conditionalMessage = () => {
    if (status === "pending") {
      return <span>Checking...</span>;
    } else if (status === "succeeded") {
      return <span>Your details have been updated!</span>;
    } else if (status === "failed") {
      return <span>{error}</span>;
    }
  };

  return (
    <>
      {/* The Auth form */}
      <MainSection styles="p-20">
        <AuthCard onSubmit={handleSubmit}>
          {/* The full name */}
          <InputCard
            label={"Update Name: "}
            value={firstName ?? ""}
            name={"firstName"}
            method={setFirstName}
          >
            <Input
              name={"lastName"}
              value={lastName ?? ""}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              styles="w-full"
            />
          </InputCard>

          {/* The username */}
          <InputCard
            label={"Update Username: "}
            value={username ?? ""}
            name={"username"}
            method={setUsername}
          />

          {/* The email */}
          <InputCard
            label={"Update Email: "}
            value={email ?? ""}
            name={"email"}
            method={setEmail}
          />

          {/* The update button */}
          <Button
            content={"Update"}
            type={"submit"}
            disabled={status === "pending"}
            width="w-full"
            bgColor="bg-blue-800 hover:bg-blue-900"
          />
        </AuthCard>
        {conditionalMessage()}
      </MainSection>
      {/* The conditional message */}
    </>
  );
}

export default UpdateDetails;
