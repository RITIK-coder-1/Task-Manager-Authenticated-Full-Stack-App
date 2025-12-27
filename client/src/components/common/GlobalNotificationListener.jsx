// /* ---------------------------------------------------------------------------
// GlobalNotificationListener.jsx
// This is a custom notification component for providing the status notification updates using react toasts
// ------------------------------------------------------------------------------ */

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast, Bounce } from "react-toastify";
import useConditionalRendering from "../../hooks/useConditionalRendering";

function GlobalNotificationListener({ slice, clearStatus }) {
  const dispatch = useDispatch();

  // Listen to the status from the Redux
  const { status, error, successMessage } = useConditionalRendering(slice);

  useEffect(() => {
    // We only care about success or failure statuses
    if (status === "succeeded") {
      toast.success(successMessage, {
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      dispatch(clearStatus());
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
      dispatch(clearStatus());
    } else if (status === "pending") {
      toast("Checking...", {
        autoClose: 100,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }, [status, error, dispatch]);

  // This component renders nothing; it only manages a side effect.
  return null;
}

export default GlobalNotificationListener;
