/* ---------------------------------------------------------------------------
Header.jsx
This is the header component for navigation between pages
------------------------------------------------------------------------------ */

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Logout } from "../index.components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import useConditionalRendering from "../../hooks/useConditionalRendering";
import { getUser } from "../../features/index.features";
import { useDispatch } from "react-redux";

function Header() {
  const dispatch = useDispatch();

  // get the user details as soon as the component mounts so that I can get the profile pic
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const { user } = useConditionalRendering("users"); // for displaying the profile pic
  const [toLogOut, setToLogOut] = useState(false); // for displaying the logout button

  return (
    // The header section
    <header className="w-full h-16 fixed top-0 left-0 z-50 bg-white shadow-md border-b border-blue-100">
      <nav className="w-full h-full mx-auto flex justify-between items-center px-5 py-3 sm:px-8 sm:py-4">
        {/* App title / logo area */}
        <h1
          className="w-36 font-extrabold text-blue-900 hidden sm:flex items-center justify-center gap-1 text-lg md:text-xl md:w-40 lg:text-2xl lg:w-44 tracking-tight"
          title="Task and Habit"
        >
          <span>Task</span>
          <span className="text-black w-full"> & Habit</span>
        </h1>

        {/* Navigation Links */}
        <div className="flex items-center mr-3 justify-center gap-10 w-full sm:gap-6 md:gap-10 text-xl sm:text-lg md:text-xl lg:text-2xl lg:mr-5 font-semibold">
          <NavLink
            to="/users/me/dashboard"
            className={({ isActive }) =>
              `transition-all duration-50 ${
                isActive
                  ? "text-blue-900 border-b-2 border-blue-900 pb-1"
                  : "text-gray-700 hover:text-blue-900"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/users/me"
            className={({ isActive }) =>
              `transition-all duration-50 ${
                isActive
                  ? "text-blue-900 border-b-2 border-blue-900 pb-1"
                  : "text-gray-700 hover:text-blue-900"
              }`
            }
            end
          >
            Profile
          </NavLink>
        </div>

        {/* Profile section */}
        <div className="relative flex flex-col items-center">
          <button
            onClick={() => setToLogOut(!toLogOut)}
            title="logout"
            className="border border-blue-900 rounded-full overflow-hidden w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex justify-center items-center bg-blue-50 hover:scale-105 transition-transform duration-200 cursor-pointer"
          >
            {/* If a profile is uploaded, display it or else a dummy image */}
            {user?.message?.profilePic === "" ? (
              <FontAwesomeIcon
                icon={faUserTie}
                style={{ color: "oklch(37.9% 0.146 265.522)" }}
                className="text-base sm:text-lg md:text-2xl"
              />
            ) : (
              <img
                src={`${user?.message?.profilePic}`}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            )}
          </button>

          {/* Logout button */}
          <div className="absolute top-12 sm:top-14 md:top-16 right-0">
            <Logout toLogOut={toLogOut} />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
