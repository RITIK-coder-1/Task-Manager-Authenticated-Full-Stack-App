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
  styles = "bg-blue-600 w-auto font-bold",
}) {
  return (
    <button
      className={`rounded-2xl h-7 text-white p-2 text-center flex justify-center items-center cursor-pointer ${styles}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {content}
    </button>
  );
}

export default Button;
