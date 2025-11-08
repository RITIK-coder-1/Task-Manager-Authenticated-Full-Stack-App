/* ---------------------------------------------------------------------------
useNotification.js
This is a custom hook for providing the status notification updates using react toasts
------------------------------------------------------------------------------ */

import { toast, Bounce } from "react-toastify";
import useConditionalRendering from "./useConditionalRendering";

function useNotification(
  slice,
  duration = 1000,
  hideProgressBar = true,
  styles
) {
  const { status, error } = useConditionalRendering(slice);

  /* ---------------------------------------------------------------------------
    I want to execute this program inside the custom submit function so that it triggers only when the data is submitted but react restricts custom hooks to component bodies only (outsite the submit function). So, I'm returning a separate function instead. I'll call the custom hook inside the component body (outside the submit function), and call this returned function inside the submit function. So I can use this custom hook for modularity as well as limit it to conditional calls only. It works due to JS closure. 
  ------------------------------------------------------------------------------ */
  function closureFunction() {
    if (status === "pending") {
      toast("Registering...", {
        position: "top-right",
        autoClose: duration,
        hideProgressBar: hideProgressBar,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        newestOnTop: true,
        rtl: false,
        className: `text-xl shadow-2xl border ${styles}`,
      });
    } else if (status === "succeeded") {
      toast("User successfully registered!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        newestOnTop: true,
        rtl: false,
        className: `text-xl shadow-2xl border ${styles}`,
      });
    } else if (status === "failed") {
      toast(error, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        newestOnTop: true,
        rtl: false,
        className: `text-xl shadow-2xl border ${styles}`,
      });
      setTimeout(() => {
        toast("Please try again!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          newestOnTop: true,
          rtl: false,
          className: `text-xl shadow-2xl border ${styles}`,
        });
      }, 500);
    }
  }
  return closureFunction;
}

export default useNotification;
