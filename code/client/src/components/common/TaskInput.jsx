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
}) {
  return (
    <div className="flex w-full justify-between items-center gap-2">
      <div className="flex flex-col justify-center items-start">
        <label htmlFor={value} className="ml-2 text-[12px] text-gray-600">
          {label}
        </label>
        <Input
          styles={`w-full cursor-auto ${
            modifyMethod ? "outline-1 cursor-alias" : "outline-0"
          } ${styles}`}
          value={value}
          readOnly={modifyMethod ? false : true}
          name={value}
          onChange={(e) => {
            setMethod(e.target.value);
          }}
          border=""
          multiline={multiline}
        />
      </div>
      <span
        onClick={() => {
          setModifyMethod(!modifyMethod);
        }}
        title={`Update ${value}`}
      >
        <FontAwesomeIcon icon={faPencil} className="text-blue-800 text-sm" />
      </span>
    </div>
  );
}

export default TaskInput;
