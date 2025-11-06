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
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={`${styles}`}
      name={name}
      onChange={onChange}
      value={value}
      readOnly={readOnly}
      id={name}
    />
  );
}

export default Input;
