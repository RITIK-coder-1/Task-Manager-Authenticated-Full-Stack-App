/* ---------------------------------------------------------------------------
AuthCard.jsx
This is the form for every input values
------------------------------------------------------------------------------ */

import React from "react";

function AuthCard({
  children,
  onSubmit,
  styles = "",
  width = "w-76 sm:w-[400px] md:w-[500px] lg:w-[550px] ",
  bgColor = "bg-white/90",
}) {
  return (
    <form
      className={` ${styles} ${width} ${bgColor} flex flex-col justify-center items-center 
    px-4 py-6 gap-4 
    shadow-[0_4px_20px_rgba(0,0,0,0.08)] 
    rounded-2xl 
    sm:px-6 
    border border-gray-100 
    hover:shadow-[0_6px_24px_rgba(0,0,0,0.1)] 
    transition-all duration-300 ease-in-out backdrop-blur-sm`}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}

export default AuthCard;
