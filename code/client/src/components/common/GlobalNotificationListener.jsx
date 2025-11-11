// /* ---------------------------------------------------------------------------
// GlobalNotificationListener.jsx
// This is a custom notifivation component for providing the status notification updates using react toasts
// ------------------------------------------------------------------------------ */

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearAuthStatus } from "../../features/authSlice";
import useConditionalRendering from "../../hooks/useConditionalRendering";
import { Bounce } from "react-toastify";

function GlobalNotificationListener() {
  const dispatch = useDispatch();

  // Listen to the status from the Redux
  const { status, error } = useConditionalRendering("auth");

  useEffect(() => {
    // We only care about success or failure statuses
    if (status === "succeeded") {
      toast.success("Operation Successful!", {
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      dispatch(clearAuthStatus());
    } else if (status === "failed") {
      // Use the error message from the store
      toast.error(`Error: ${error}`, {
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setTimeout(() => {
        toast.error("Please try again!", {
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }, [100]);
      dispatch(clearAuthStatus());
    }
  }, [status, error, dispatch]);

  // This component renders nothing; it only manages a side effect.
  return null;
}

export default GlobalNotificationListener;
