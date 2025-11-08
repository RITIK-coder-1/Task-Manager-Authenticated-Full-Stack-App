/* ---------------------------------------------------------------------------
Login.jsx
This is the login page for logging in an existing user
------------------------------------------------------------------------------ */

import React, { useState } from "react";
import {
  AuthCard,
  Button,
  InputCard,
  MainSection,
} from "../../components/index.components.js";
import { login } from "../../features/index.features.js";
import { useDispatch } from "react-redux";
import { useNavigation } from "../../hooks/index.hooks.js";
import { ToastContainer } from "react-toastify";
import { useNotification } from "../../hooks/index.hooks.js";

function Login() {
  // ----------------------------------------------------------------------------------
  // All the variables of the script
  // ----------------------------------------------------------------------------------
  const dispatch = useDispatch();
  const notifications = useNotification(
    "auth",
    5000,
    false,
    "left-96",
    "Logging in...",
    "User successfully logged in!"
  ); // this custom hook returns a function so that I can call it inside a function body (handleOnSubmit)

  // the local state variables for data holding
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");

  // ----------------------------------------------------------------------------------
  // The function to dispatch the login action
  // ----------------------------------------------------------------------------------

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reloads
    const userData = {
      credential: credential,
      password: password,
    };

    dispatch(login(userData));

    notifications(); // the toastify notifications
  };

  // ----------------------------------------------------------------------------------
  // Once the user logs in, they should automatically be navigated to the dashboard
  // ----------------------------------------------------------------------------------
  useNavigation("auth", "/users/me/dashboard");

  return (
    // ----------------------------------------------------------------------------------
    // The Auth form
    // ----------------------------------------------------------------------------------
    <MainSection>
      <AuthCard onSubmit={handleSubmit}>
        {/* The username/email */}
        <InputCard
          label={"Enter Your Credentials:"}
          name={"credentials"}
          method={setCredential}
          placeholder={"Username/Email"}
        />

        {/* The password */}
        <InputCard
          label={"Enter Your Password:"}
          name={"password"}
          method={setPassword}
          placeholder={"Password"}
          type={"password"}
        />

        {/* The button to submit the data */}
        <div className="flex justify-center items-center w-full">
          <Button
            content={"Log in"}
            type={"submit"}
            width={"w-full"}
            bgColor="bg-gray-700 hover:bg-gray-800"
          />
        </div>

        {/* The notifications */}
        <ToastContainer />
      </AuthCard>
    </MainSection>
  );
}

export default Login;
