/* ---------------------------------------------------------------------------
useConditionalRendering.js
This is a custom hook for providing the state status, the error message and the user value
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

  const { status, error, user } = { sliceState };
  return { status, error, user };
}

export default useConditionalRendering;
