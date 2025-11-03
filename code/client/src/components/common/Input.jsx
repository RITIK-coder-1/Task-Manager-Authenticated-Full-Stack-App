import React from "react";

function Input({ placeholder, name, onChange, value, id, styles = "" }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={`outline-1 ${styles}`}
      name={name}
      onChange={onChange}
      value={value}
      readOnly={false}
      id={id}
    />
  );
}

export default Input;
