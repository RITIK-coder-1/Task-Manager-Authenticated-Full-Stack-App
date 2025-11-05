/* ---------------------------------------------------------------------------
useNavigation.js
This is a custom hook for automatically transfering the user to specific pages after specific actions
------------------------------------------------------------------------------ */

import { useNavigate, useLocation } from "react-router-dom";
import useConditionalRendering from "./useConditionalRendering";
import { useEffect } from "react";
import { resetNavStatus } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";

const useNavigation = (url) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { error, navigationStatus } = useConditionalRendering("auth");
  const fromPath = location.state?.from?.pathname || url; // either visit the page the user intended to, or visit the specific URL

  // // Use useEffect to handle the redirect after successful login
  useEffect(() => {
    if (navigationStatus === "succeeded" && !error) {
      // 3. Navigate the user to the intended page
      navigate(fromPath, { replace: true }); // replace is true so that the user can't press the back button to visit the protected routes once prohibited
    }
    dispatch(resetNavStatus());
  }, [navigationStatus, error, navigate, fromPath, dispatch]);
};

export default useNavigation;
