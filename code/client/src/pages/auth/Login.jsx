import React, { useState, useEffect } from "react";
import { AuthCard, Input, Button } from "../../components/index.components.js";
import { login } from "../../features/index.features.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fromPath = location.state?.from?.pathname || "/users/me/dashboard";

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reloads
    const userData = {
      credential: credential,
      password: password,
    };

    dispatch(login(userData));
  };

  // Use useEffect to handle the redirect after successful login
  useEffect(() => {
    if (status === "succeeded" && !error) {
      // 3. Navigate the user to the intended protected page
      navigate(fromPath, { replace: true });
    }

    // Cleanup function (optional but good practice)
    // return () => { dispatch(clearError()); };
  }, [status, error, navigate, fromPath, dispatch]);

  const conditionalMessage = () => {
    if (status === "pending") {
      return <span>Checking...</span>;
    } else if (status === "succeeded") {
      return <span>The user has been successfully logged in!</span>;
    } else if (status === "failed") {
      return <span>{error}</span>;
    }
  };
  return (
    <AuthCard onSubmit={handleSubmit}>
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
      <Button content={"Log in"} type={"submit"} />
      {conditionalMessage()}
    </AuthCard>
  );
}

export default Login;
