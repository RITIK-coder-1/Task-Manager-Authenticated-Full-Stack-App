/* ---------------------------------------------------------------------------
Login.jsx
This is the login page for logging in an existing user
------------------------------------------------------------------------------ */

import React, { useState } from "react";
import { AuthCard, Input, Button } from "../../components/index.components.js";
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
  const notifications = useNotification("auth", 5000, false); // this custom hook returns a function so that I can call it inside a functions body (handleOnSubmit)

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
    <AuthCard onSubmit={handleSubmit}>
      {/* The username/email */}
      <div className="flex gap-2">
        <label htmlFor="credential">Enter Your Username or Email: </label>
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
        <label htmlFor="password">Enter Your password: </label>
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

      {/* The notifications */}
      <ToastContainer />
    </AuthCard>
  );
}

export default Login;
