/* ---------------------------------------------------------------------------
Logout.jsx
This button logs out a user
------------------------------------------------------------------------------ */

import { logout } from "../../features/index.features.js";
import { useDispatch } from "react-redux";
import { useNavigation } from "../../hooks/index.hooks.js";

function Logout({ toLogOut }) {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  // ----------------------------------------------------------------------------------
  // Once the user logs out, they should automatically be navigated to the homepage
  // ----------------------------------------------------------------------------------
  useNavigation("auth", "/");

  return (
    <>
      {/* The logout button */}
      <button
        className={`w-25 text-lg sm:text-xl py-2 px-4 font-semibold border border-blue-200 text-blue-900 bg-white shadow-md rounded-md transition-all duration-300 hover:shadow-lg hover:bg-blue-50 active:scale-95 fixed top-12 right-3 sm:top-14 md:top-16 sm:w-30  ${
          toLogOut
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        } cursor-pointer`}
        onClick={onLogout}
        title="Log out"
      >
        Log out
      </button>
    </>
  );
}

export default Logout;
