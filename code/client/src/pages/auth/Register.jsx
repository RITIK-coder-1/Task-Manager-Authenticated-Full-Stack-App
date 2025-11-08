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
  InputCard,
} from "../../components/index.components.js";
import { useDispatch } from "react-redux";
import { register } from "../../features/index.features.js";
import {
  useConditionalRendering,
  useNavigation,
} from "../../hooks/index.hooks.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";

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
    <>
      <MainSection styles="py-1 md:py-3">
        <AuthCard onSubmit={handleOnSubmit}>
          {/* The profile pic */}
          <div className="flex gap-1 flex-col items-center justify-center">
            <span className="border border-blue-900 rounded-full p-1 w-12 h-12 flex justify-center items-center sm:w-16 sm:h-16 lg:w-26 lg:h-26">
              <FontAwesomeIcon
                icon={faUserTie}
                style={{ color: "oklch(37.9% 0.146 265.522)" }}
                className="text-3xl sm:text-4xl lg:text-6xl"
              />
            </span>
            <label
              className="text-[11px] text-gray-800 font-semibold sm:text-sm md:text-[16px] lg:text-xl"
              htmlFor="profilePic"
            >
              Set a profile:
            </label>
            <input
              type="file"
              className="border border-gray-200 rounded-sm bg-gray-100 p-1 cursor-pointer w-32 text-[9px] hover:bg-gray-200 sm:text-[11px] sm:w-36 lg:text-sm lg:w-44"
              name="profilePic"
              id="profilePic"
              onChange={(e) => {
                setProfile(e.target.files[0]);
              }}
              title="Choose a profile"
            />
          </div>

          {/* The fullname */}
          <InputCard
            label={"Fullname:"}
            placeholder={"Enter first name"}
            name={"firstname"}
            method={setFirstName}
          >
            <Input
              placeholder={"Enter last name"}
              name={"lastName"}
              onChange={(e) => {
                const value = e.target.value;
                setLastName(value);
              }}
              styles=""
            />
          </InputCard>

          {/* The username */}
          <InputCard
            label={"Username:"}
            placeholder={"Min 3 characters"}
            name={"username"}
            method={setUsername}
          />

          {/* The email */}
          <InputCard
            label={"Email:"}
            placeholder={"example@gmail.com"}
            name={"email"}
            method={setEmail}
          />

          {/* The password */}
          <InputCard
            label={"Password:"}
            placeholder={"Min 10 characters"}
            name={"password"}
            method={setPassword}
          />

          {/* The button to submit the data */}
          <div className="flex justify-center items-center w-full">
            <Button content={"Register"} type={"submit"} width={"w-full"} />
          </div>
        </AuthCard>
        {/* The status message */}
        {renderStatusMessage()}
      </MainSection>
    </>
  );
}

export default Register;
