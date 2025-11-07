/* ---------------------------------------------------------------------------
Button.jsx
This is a common button component for reuse
------------------------------------------------------------------------------ */

import React from "react";

function Button({ content, onClick, type, disabled, styles = "w-auto" }) {
  return (
    <button
      className={`bg-blue-600 font-bold rounded-3xl p-2 h-7 text-white text-center flex justify-center items-center cursor-pointer font-sans hover:bg-blue-700 ${styles}`}
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
