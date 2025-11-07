/* ---------------------------------------------------------------------------
Register.jsx
This is the register page for registering a new user 
------------------------------------------------------------------------------ */

import React, { useState } from "react";
import {
  Input,
  AuthCard,
  Button,
  MainSection,
} from "../../components/index.components.js";
import { useDispatch } from "react-redux";
import { register } from "../../features/index.features.js";
import {
  useConditionalRendering,
  useNavigation,
} from "../../hooks/index.hooks.js";

function Register() {
  // ----------------------------------------------------------------------------------
  // All the variables of the script
  // ----------------------------------------------------------------------------------
  const { status, error } = useConditionalRendering("auth");
  const dispatch = useDispatch();

  // the local state variables for data holding
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);

  // ----------------------------------------------------------------------------------
  // The function to dispatch the register action
  // ----------------------------------------------------------------------------------

  const handleOnSubmit = (e) => {
    e.preventDefault(); // prevent page re-load

    const payload = new FormData(); // creating the new FormData

    // The fullName is an object with two nested objects and FormData only accepts a string. I need to stringify them.
    const fullNameString = JSON.stringify({
      firstName: firstName,
      lastName: lastName,
    });
    payload.append("fullNameString", fullNameString);
    payload.append("email", email);
    payload.append("password", password);
    payload.append("username", username);

    if (profile && profile instanceof File) {
      payload.append("profilePic", profile); // only if the profile is uploaded
    }

    dispatch(register(payload));
  };

  // ----------------------------------------------------------------------------------
  // Once the user registers, they should automatically be navigated to the dashboard
  // ----------------------------------------------------------------------------------

  useNavigation("auth", "/users/me/dashboard");

  // ----------------------------------------------------------------------------------
  // This is the conditional rendering message based on the status of the state
  // ----------------------------------------------------------------------------------

  const renderStatusMessage = () => {
    if (status === "pending") {
      return <span>Checking...</span>;
    } else if (status === "succeeded") {
      return <span>User is successfully registered!</span>;
    } else if (status === "failed") {
      return <span>{error}</span>;
    }
    // Handle the default/idle state
    return null;
  };

  return (
    // ----------------------------------------------------------------------------------
    // The Auth form
    // ----------------------------------------------------------------------------------
    <AuthCard onSubmit={handleOnSubmit} styles="border w-full">
      {/* The fullname */}
      <div className="flex gap-2 flex-col items-start justify-center border">
        <label htmlFor="firstName">Enter Your Full Name: </label>
        <Input
          placeholder={"Enter first name"}
          name={"firstName"}
          onChange={(e) => {
            const value = e.target.value;
            setFirstName(value);
          }}
        />
        <Input
          placeholder={"Enter last name"}
          name={"lastName"}
          onChange={(e) => {
            const value = e.target.value;
            setLastName(value);
          }}
        />
      </div>

      {/* The username */}
      <div className="flex gap-2 flex-col items-start">
        <label htmlFor="username">Enter a username: </label>
        <Input
          placeholder={"Minimum 3 characters"}
          name={"username"}
          onChange={(e) => {
            const value = e.target.value;
            setUsername(value);
          }}
        />
      </div>

      {/* The email */}
      <div className="flex gap-2 flex-col items-start">
        <label htmlFor="email">Enter Your Email: </label>
        <Input
          placeholder={"example@gmail.com"}
          name={"email"}
          onChange={(e) => {
            const value = e.target.value;
            setEmail(value);
          }}
        />
      </div>

      {/* The password */}
      <div className="flex gap-2 flex-col items-start">
        <label htmlFor="password">Enter Your password: </label>
        <Input
          placeholder={"it should be at least of 10 characters."}
          name={"password"}
          onChange={(e) => {
            const value = e.target.value;
            setPassword(value);
          }}
        />
      </div>

      {/* The profile pic */}
      <div className="flex gap-2 flex-col items-start">
        <label>Choose an image for your profile (optional): </label>
        <input
          type="file"
          className="outline-1 cursor-pointer"
          name="profilePic"
          onChange={(e) => {
            setProfile(e.target.files[0]);
          }}
        />
      </div>

      {/* The button to submit the data */}
      <Button content={"Register"} type={"submit"} />

      {/* The status message */}
      {renderStatusMessage()}
    </AuthCard>
  );
}

export default Register;
