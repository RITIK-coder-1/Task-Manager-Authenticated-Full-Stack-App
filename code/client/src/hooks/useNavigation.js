/* ---------------------------------------------------------------------------
useNavigation.js
This is a custom hook for automatically transfering the user to specific pages after specific actions
------------------------------------------------------------------------------ */

import { useNavigate, useLocation } from "react-router-dom";
import useConditionalRendering from "./useConditionalRendering";
import { useEffect } from "react";

const useNavigation = (url) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { status, error } = useConditionalRendering("auth");
  const fromPath = location.state?.from?.pathname || url; // either visit the page the user intended to, or visit the specific URL

  // Use useEffect to handle the redirect after successful login
  useEffect(() => {
    if (status === "succeeded" && !error) {
      // 3. Navigate the user to the intended page
      navigate(fromPath, { replace: true }); // replace is true so that the user can't press the back button to visit the protected routes once prohibited
    }
  }, [status, error, navigate, fromPath]);
};

export default useNavigation;
