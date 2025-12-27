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
import { useDispatch } from "react-redux";
import { userUpdate } from "../../features/userSlice.js";
import { useConditionalRendering } from "../../hooks/index.hooks.js";

function UpdateDetails() {
  // ----------------------------------------------------------------------------------
  // All the variables of the script
  // ----------------------------------------------------------------------------------

  // As the details of the user have already been fetched by the header, I don't need to do it again
  const { status, error, user } = useConditionalRendering("users");
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const dispatch = useDispatch();

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
  }, [user, setFirstName, setLastName, setEmail, setUsername]);

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
      </MainSection>
    </>
  );
}

export default UpdateDetails;
