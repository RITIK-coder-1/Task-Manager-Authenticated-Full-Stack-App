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
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={`rounded-md border-gray-300 p-2 ${border} ${styles}`}
      name={name}
      onChange={onChange}
      value={value}
      readOnly={readOnly}
      id={name}
    />
  );
}

export default Input;
