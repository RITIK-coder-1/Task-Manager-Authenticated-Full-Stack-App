import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="w-full h-24 border">
      <nav className="flex justify-center items-center gap-3">
        <Link to="/"> Home </Link> |<Link to="/users/login">Log in</Link> |
        <Link to="/users/me/dashboard">Dashboard</Link> |
        <Link to="/users/me">Profile</Link>
      </nav>
    </header>
  );
}

export default Header;
