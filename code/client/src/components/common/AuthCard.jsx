/* ---------------------------------------------------------------------------
AuthCard.jsx
This is the form for every input values
------------------------------------------------------------------------------ */

import React from "react";

function AuthCard({ children, onSubmit, styles = "" }) {
  return (
    <form
      className={` ${styles} flex flex-col justify-center items-center 
    px-4 py-6 gap-4 
    shadow-[0_4px_20px_rgba(0,0,0,0.08)] 
    w-76 rounded-2xl 
    sm:w-[400px] sm:px-6 md:w-[500px] lg:w-[550px] 
    border border-gray-100 
    hover:shadow-[0_6px_24px_rgba(0,0,0,0.1)] 
    transition-all duration-300 ease-in-out backdrop-blur-sm bg-white/90`}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}

export default AuthCard;
