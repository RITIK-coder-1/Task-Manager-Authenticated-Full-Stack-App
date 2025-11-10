/* ---------------------------------------------------------------------------
Input.jsx
This is a common input component for reuse. If an element needs multiple lines (task descriptions), it will return the text-area element 
------------------------------------------------------------------------------ */

function Input({
  placeholder,
  name,
  onChange,
  value,
  styles = "",
  readOnly = false,
  border = "border border-gray-300 outline:gray-300 hover:outline focus:outline focus:outline-blue-600",
  type = "text",
  multiline = false,
}) {
  const commonProps = {
    placeholder,
    className: `rounded-md transition-all duration-150 p-2 sm:p-3 md:p-4 lg:p-6 ${border} ${styles}`,
    name,
    onChange,
    value,
    readOnly,
    id: name,
    title: name,
  };

  if (multiline) {
    // Renders a TEXTAREA for wrapping content
    return <textarea {...commonProps} />;
  }

  // Renders a standard INPUT for single-line content
  return <input type={type} {...commonProps} />;
}

export default Input;
