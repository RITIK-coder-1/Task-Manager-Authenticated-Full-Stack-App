/* ---------------------------------------------------------------------------
CreateTaskModal.jsx
This is the modal to create a task on the dashboard
------------------------------------------------------------------------------ */

import { useState } from "react";
import { AuthCard, Button, InputCard } from "../index.components";
import { useDispatch } from "react-redux";
import { create } from "../../features/taskSlice.js";

function CreateTaskModal({ onClick }) {
  // ----------------------------------------------------------------------------------
  // All the variables of the script
  // ----------------------------------------------------------------------------------
  const dispath = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [isCompleted, setIsCompleted] = useState(false);
  const [category, setCategory] = useState("unspecified");

  // ----------------------------------------------------------------------------------
  // The function to create a new task
  // ----------------------------------------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault(); // for preventing page reload

    const dataObject = {
      title: title,
      description: description,
      priority: priority,
      category: category,
      isCompleted: isCompleted,
    };

    dispath(create(dataObject));
  };

  return (
    <>
      {/* The auth card */}
      <AuthCard
        onSubmit={handleSubmit}
        width="w-80 items-start sm:w-120 lg:w-180"
        bgColor="bg-blue-50/98"
      >
        {/* The name of the tasks */}
        <InputCard
          label={"Title: "}
          placeholder={"Title"}
          name={"title"}
          method={setTitle}
          value={title}
        />

        {/* The additional notes */}
        <InputCard
          label={"Any Notes: "}
          placeholder={"Notes..."}
          name={"description"}
          method={setDescription}
          value={description}
        />

        {/* The priority */}
        <span className="w-full">
          <label
            htmlFor="priority"
            className="text-[11px] text-gray-800 font-semibold sm:text-sm md:text-[16px] lg:text-lg"
          >
            Select priority:
          </label>
          <select
            className="outline-1 w-full py-2 rounded-md outline-gray-700 cursor-pointer md:text-lg"
            id="priority"
            onChange={(e) => {
              setPriority(e.target.value);
            }}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Urgent</option>
          </select>
        </span>

        {/* The category */}
        <InputCard
          label={"Any Category: "}
          placeholder={"Category"}
          name={"category"}
          method={setCategory}
          value={category}
        />

        {/* The completion */}
        <span className="w-full flex justify-start items-center gap-2">
          <label
            htmlFor="isCompleted"
            className="text-[15px] text-gray-800 font-semibold sm:text-sm md:text-[16px] lg:text-lg"
          >
            Completion:
          </label>
          <input
            type="checkbox"
            name="isCompleted"
            id="isCompleted"
            onClick={() => {
              setIsCompleted(!isCompleted);
            }}
            className="cursor-pointer text-3xl"
          />
        </span>
        <div className="w-full flex flex-col gap-2 justify-center items-center">
          {/* The button to create the task */}
          <Button
            content={"Create"}
            type={"submit"}
            width="w-full sm:w-100 lg:w-150"
            onClick={() => {
              setTimeout(() => {
                onClick();
              }, 2000);
            }}
          />

          {/* The button to cancel the modal */}
          <Button
            content={"Cancel"}
            onClick={onClick}
            width="w-full sm:w-100 lg:w-150"
            bgColor="bg-red-800 hover:bg-red-900"
          />
        </div>
      </AuthCard>
    </>
  );
}

export default CreateTaskModal;
