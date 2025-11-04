import React from "react";
import { NavLink } from "react-router-dom";
import Logout from "../auth/Logout";

function Header() {
  return (
    <header className="w-full h-24 border">
      <nav className="flex justify-center items-center gap-3">
        <NavLink
          to="/users/me/dashboard"
          className={({ isActive }) =>
            isActive ? "text-blue-600" : "text-black"
          }
        >
          Dashboard
        </NavLink>
        |
        <NavLink
          to="/users/me"
          className={({ isActive }) =>
            isActive ? "text-blue-600" : "text-black"
          }
          end // Only if the URL matches exactly
        >
          Profile
        </NavLink>
      </nav>
      <Logout />
    </header>
  );
}

export default Header;
