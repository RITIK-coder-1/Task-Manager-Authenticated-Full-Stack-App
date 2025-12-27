/* ---------------------------------------------------------------------------
useConditionalRendering.js
This is a custom hook for providing the state status and the error message for all the slices, and the specific slice values
------------------------------------------------------------------------------ */

import { useSelector } from "react-redux";
function useConditionalRendering(slice) {
  // the slice is dynamic (auth, users or tasks)
  // Because an object expects a string, I'm using the square notation
  const sliceState = useSelector((state) => state[slice]);

  // Check if the slice exists before accessing properties
  if (!sliceState) {
    console.error(`Redux slice with name '${slice}' not found.`);
    return {
      status: "idle",
      error: null,
      user: null,
      successMessage: null,
      tasks: null,
      specificTask: null,
    }; // Fallback
  }

  const {
    status,
    error,
    successMessage,
    user,
    navigationStatus,
    specificTask,
    tasks,
  } = sliceState; // deconstructing the state object for immediate access
  return {
    status,
    error,
    successMessage,
    user,
    navigationStatus,
    specificTask,
    tasks,
  };
}

export default useConditionalRendering;
