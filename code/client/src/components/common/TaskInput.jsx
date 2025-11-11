/* ---------------------------------------------------------------------------
TaskInput.jsx
This is a common task input component for task details display
------------------------------------------------------------------------------ */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import Input from "./Input";

function TaskInput({
  label,
  styles,
  value,
  modifyMethod,
  setMethod,
  setModifyMethod,
  multiline,
  placeholder,
  rows,
  border,
}) {
  return (
    <div className="flex w-full justify-between items-center">
      <div className="flex flex-col justify-center items-start w-full">
        <label
          htmlFor={value}
          className="text-[12px] text-gray-600 md:text-[15px]"
        >
          {label}
        </label>
        <Input
          styles={`py-2 px-1 cursor-auto ${
            modifyMethod ? "outline-1 cursor-alias" : "outline-0"
          } ${styles}`}
          value={value}
          readOnly={modifyMethod ? false : true}
          name={value}
          onChange={(e) => {
            setMethod(e.target.value);
          }}
          border={border ?? ""}
          multiline={multiline}
          placeholder={placeholder}
          rows={rows}
        />
      </div>
      <span
        onClick={() => {
          setModifyMethod(!modifyMethod);
        }}
        title={`Update ${value}`}
      >
        <FontAwesomeIcon
          icon={faPencil}
          className="text-blue-800 text-sm md:text-lg cursor-pointer"
        />
      </span>
    </div>
  );
}

export default TaskInput;
