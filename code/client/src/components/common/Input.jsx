/* ---------------------------------------------------------------------------
Input.jsx
This is a common input component for reuse
------------------------------------------------------------------------------ */

import React from "react";

function Input({
  placeholder,
  name,
  onChange,
  value,
  styles = "",
  readOnly = false,
  border = "border",
  type = "text",
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`rounded-md border-gray-300 outline:gray-300 hover:outline focus:outline focus:outline-blue-600 transition-all duration-150 p-2 sm:p-3 md:p-4 lg:p-6 ${border} ${styles}`}
      name={name}
      onChange={onChange}
      value={value}
      readOnly={readOnly}
      id={name}
      title={name}
    />
  );
}

export default Input;
