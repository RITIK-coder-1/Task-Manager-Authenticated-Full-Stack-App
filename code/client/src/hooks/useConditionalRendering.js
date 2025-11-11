/* ---------------------------------------------------------------------------
useConditionalRendering.js
This is a custom hook for providing the state status and the error message for all the slices, and the user value for the user slice
------------------------------------------------------------------------------ */

import { useSelector } from "react-redux";
function useConditionalRendering(slice) {
  // the slice is dynamic (auth, users or tasks)
  // Because an object expects a string, I'm using the square notation
  const sliceState = useSelector((state) => state[slice]);

  // Check if the slice exists before accessing properties
  if (!sliceState) {
    console.error(`Redux slice with name '${slice}' not found.`);
    return { status: "idle", error: null, user: null }; // Fallback
  }

  const { status, error, user, navigationStatus } = sliceState; // deconstructing the state object for immediate access
  return { status, error, user, navigationStatus };
}

export default useConditionalRendering;
