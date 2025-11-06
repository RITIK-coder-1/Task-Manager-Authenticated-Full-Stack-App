/* ---------------------------------------------------------------------------
UpdateDetails.jsx
This is the page to update the details of the profile 
------------------------------------------------------------------------------ */

import React, { useEffect, useState } from "react";
import { AuthCard, Input, Button } from "../../components/index.components";
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
  // For better UX, I made sure to pre-load the current value of the task details
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
      <AuthCard onSubmit={handleSubmit}>
        {/* The full name */}
        <div className="flex gap-2">
          <label>Update Your Full Name: </label>
          <Input
            placeholder={"first name"}
            name={"firstName"}
            value={firstName ?? ""}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <Input
            placeholder={"last name"}
            name={"lastName"}
            value={lastName ?? ""}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>

        {/* The username */}
        <div className="flex gap-2">
          <label>Update your username: </label>
          <Input
            placeholder={"Minimum 3 characters"}
            name={"username"}
            value={username ?? ""}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>

        {/* The email */}
        <div className="flex gap-2">
          <label>Update Your Email: </label>
          <Input
            placeholder={"example@gmail.com"}
            name={"email"}
            value={email ?? ""}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        {/* The update button */}
        <Button
          content={"Update"}
          type={"submit"}
          disabled={status === "pending"}
        />
      </AuthCard>

      {/* The conditional message */}
      {conditionalMessage()}
    </>
  );
}

export default UpdateDetails;
