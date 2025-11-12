/* ---------------------------------------------------------------------------
Delete.jsx
This button deletes a user
------------------------------------------------------------------------------ */

import { logout, userDelete } from "../../features/index.features.js";
import { useDispatch } from "react-redux";
import { useNavigation } from "../../hooks/index.hooks.js";

function Delete({ toDelete }) {
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(userDelete());
  };

  // ----------------------------------------------------------------------------------
  // Once the user is deleted, they should automatically be navigated to the homepage
  // ----------------------------------------------------------------------------------
  useNavigation("auth", "/");

  return (
    <>
      {/* The logout button */}
      <button
        className={`w-25 text-lg sm:text-xl py-2 px-4 font-semibold border border-b-red-50-200 text-red-900 bg-white shadow-md rounded-md transition-all duration-300 hover:shadow-lg hover:bg-red-300 active:scale-95 fixed top-25 right-3 sm:top-27 md:top-29 sm:w-30 ${
          toDelete
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        } cursor-pointer`}
        onClick={onDelete}
        title="Delete the account"
      >
        Delete
      </button>
    </>
  );
}

export default Delete;
