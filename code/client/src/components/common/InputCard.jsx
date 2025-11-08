/* ---------------------------------------------------------------------------
Input.jsx
This is a common input card for entering values with labels and styles
------------------------------------------------------------------------------ */

import { Input } from "../index.components";

function InputCard({ children, label, placeholder, name, method, type }) {
  return (
    <div className="flex flex-col items-start justify-center">
      <label
        htmlFor={name}
        className="text-[11px] text-gray-800 font-semibold sm:text-sm md:text-[16px] lg:text-lg"
      >
        {label}
      </label>
      <Input
        placeholder={placeholder}
        name={name}
        onChange={(e) => {
          const value = e.target.value;
          method(value);
        }}
        styles="mb-2"
        type={type}
      />
      {children}
    </div>
  );
}

export default InputCard;
