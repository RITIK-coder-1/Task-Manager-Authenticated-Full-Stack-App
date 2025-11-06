import React from "react";

function Input({
  placeholder,
  name,
  onChange,
  value,
  id,
  styles = "",
  readOnly,
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
