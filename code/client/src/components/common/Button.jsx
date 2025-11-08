/* ---------------------------------------------------------------------------
Button.jsx
This is a common button component for reuse
------------------------------------------------------------------------------ */

import React from "react";

function Button({
  content,
  onClick,
  type,
  disabled,
  styles = "p-5 text-lg sm:text-2xl sm:p-6 md:p-7 md:text-3xl lg:p-8 lg:text-4xl bg-blue-900 hover:bg-blue-800 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300",
  bgColor = "bg-blue-600 hover:bg-blue-700",
  width = "w-40 sm:w-56 md:w-64 lg:w-72",
}) {
  return (
    <button
      className={` font-bold rounded-3xl p-2 h-7 text-white text-center flex justify-center items-center cursor-pointer font-sans ${styles} ${bgColor} ${width}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
      title={content}
    >
      {content}
    </button>
  );
}

export default Button;
