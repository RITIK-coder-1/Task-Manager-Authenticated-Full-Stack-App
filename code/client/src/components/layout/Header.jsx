/* ---------------------------------------------------------------------------
Header.jsx
This is the header component for navigation between pages
------------------------------------------------------------------------------ */

import React from "react";
import { NavLink } from "react-router-dom";
import { Logout } from "../index.components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import useConditionalRendering from "../../hooks/useConditionalRendering";

function Header() {
  const { user } = useConditionalRendering("users");
  console.log(user?.message);

  return (
    <header className="w-full h-18 border-b border-blue-200 fixed z-50 shadow-xl bg-white py-2">
      <nav className="w-full h-full flex flex-col px-5 items-center font-semibold text-lg">
        <div className="w-full flex items-center justify-end">
          <span className="border border-blue-900 rounded-full overflow-hidden w-6 h-6 flex justify-center items-center sm:w-16 sm:h-16 lg:w-26 lg:h-26 bg-blue-50">
            {user?.message?.profilePic === "" ? (
              <FontAwesomeIcon
                icon={faUserTie}
                style={{ color: "oklch(37.9% 0.146 265.522)" }}
                className="text-sm sm:text-4xl lg:text-6xl"
              />
            ) : (
              <img
                src={`${user?.message?.profilePic}`}
                width={"100%"}
                height={"100%"}
              />
            )}
          </span>
        </div>
        <div className="w-full flex justify-around">
          <NavLink
            to="/users/me/dashboard"
            className={({ isActive }) =>
              `${isActive ? "text-blue-900" : "text-black"}`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/users/me"
            className={({ isActive }) =>
              isActive ? "text-blue-900" : "text-black"
            }
            end // Only if the URL matches exactly
          >
            Profile
          </NavLink>
        </div>
      </nav>
      {/* <Logout /> */}
    </header>
  );
}

export default Header;
