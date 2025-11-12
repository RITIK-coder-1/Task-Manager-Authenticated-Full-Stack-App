/* ---------------------------------------------------------------------------
Header.jsx
This is the header component for navigation between pages
------------------------------------------------------------------------------ */

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Logout, Delete, ProfilePic } from "../index.components";

function Header() {
  const [toggle, setToggle] = useState(false); // for displaying the logout button

  return (
    // The header section
    <header className="w-full h-16 fixed top-0 left-0 z-1000 bg-white shadow-md border-b border-blue-100">
      <nav className="w-full h-full flex justify-between items-center px-5 py-3 sm:px-8 sm:py-4">
        {/* App title / logo area */}
        <h1
          className="w-36 font-extrabold text-blue-900 hidden sm:flex items-center justify-center gap-1 text-lg md:w-40 md:text-xl lg:text-2xl lg:w-44 tracking-tight"
          title="Task and Habit"
        >
          <span>Task</span>
          <span className="text-black w-auto"> & Habit</span>
        </h1>

        {/* Navigation Links */}
        <div className="flex items-center justify-center gap-10 w-auto text-xl sm:text-lg sm:mr-10 md:mr-20 md:text-xl lg:text-2xl font-semibold">
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
            onClick={() => setToggle(!toggle)}
            className="border border-blue-900 rounded-full overflow-hidden w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex justify-center items-center bg-blue-50 hover:scale-105 transition-transform duration-200 cursor-pointer"
          >
            <ProfilePic
              dummyStyles={"text-base sm:text-lg md:text-2xl"}
              profileStyles={"w-full h-full"}
              title="click"
            />
          </button>

          {/* Logout button */}
          <div className="absolute top-12 sm:top-14 md:top-16 right-0">
            <Logout toLogOut={toggle} />
            <Delete toDelete={toggle} />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
