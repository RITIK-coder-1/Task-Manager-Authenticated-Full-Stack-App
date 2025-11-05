/* ---------------------------------------------------------------------------
Login.jsx
This is the login page for logging in an existing user
------------------------------------------------------------------------------ */

import React, { useState } from "react";
import { AuthCard, Input, Button } from "../../components/index.components.js";
import { login } from "../../features/index.features.js";
import { useDispatch } from "react-redux";
import {
  useConditionalRendering,
  useNavigation,
} from "../../hooks/index.hooks.js";

function Login() {
  // ----------------------------------------------------------------------------------
  // All the variables of the script
  // ----------------------------------------------------------------------------------
  const { status, error } = useConditionalRendering("auth");
  const dispatch = useDispatch();

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
  };

  // ----------------------------------------------------------------------------------
  // This is the conditional rendering message based on the status of the state
  // ----------------------------------------------------------------------------------

  const conditionalMessage = () => {
    if (status === "pending") {
      return <span>Checking...</span>;
    } else if (status === "succeeded") {
      return <span>The user has been successfully logged in!</span>;
    } else if (status === "failed") {
      return <span>{error}</span>;
    }

    // Handle the default/idle state
    return null;
  };

  // ----------------------------------------------------------------------------------
  // Once the user logs in, they should automatically be navigated to the dashboard
  // ----------------------------------------------------------------------------------
  useNavigation("/users/me/dashboard");

  return (
    // ----------------------------------------------------------------------------------
    // The Auth form
    // ----------------------------------------------------------------------------------
    <AuthCard onSubmit={handleSubmit}>
      {/* The username/email */}
      <div className="flex gap-2">
        <label>Enter Your Username or Email: </label>
        <Input
          placeholder={"username/email"}
          name={"credential"}
          onChange={(e) => {
            setCredential(e.target.value);
          }}
        />
      </div>

      {/* The password */}
      <div className="flex gap-2">
        <label>Enter Your password: </label>
        <Input
          placeholder={"it should be at least of 10 characters."}
          name={"password"}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>

      {/* The submit button */}
      <Button content={"Log in"} type={"submit"} />

      {/* The status message */}
      {conditionalMessage()}
    </AuthCard>
  );
}

export default Login;
