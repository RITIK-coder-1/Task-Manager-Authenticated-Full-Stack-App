/* ---------------------------------------------------------------------------
CreateTaskModal.jsx
This is the modal to create a task on the dashboard
------------------------------------------------------------------------------ */

import React, { useState } from "react";
import { AuthCard, Button, Input } from "../index.components";
import { useDispatch } from "react-redux";
import { create } from "../../features/taskSlice.js";
import useConditionalRendering from "../../hooks/useConditionalRendering.js";

function CreateTaskModal({ onClick }) {
  // ----------------------------------------------------------------------------------
  // All the variables of the script
  // ----------------------------------------------------------------------------------
  const dispath = useDispatch();
  const { status, error } = useConditionalRendering("tasks");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [isCompleted, setIsCompleted] = useState("");
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

  // ----------------------------------------------------------------------------------
  // The conditional message on the status of the tasks
  // ----------------------------------------------------------------------------------
  const conditionalMessage = () => {
    if (status === "pending") {
      return <span>Checking...</span>;
    } else if (status === "succeeded") {
      return <span>Your task has been created!</span>;
    } else if (status === "failed") {
      return <span>{error}</span>;
    }
  };

  return (
    <>
      {/* The auth card */}
      <AuthCard onSubmit={handleSubmit} styles="border items-center">
        {/* The name of the tasks */}
        <label htmlFor="title">Enter the title of the task: (Required)</label>
        <Input
          name={"title"}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        {/* The additional notes */}
        <label htmlFor="description">Add any notes (optional): </label>
        <Input
          name={"description"}
          width="w-full"
          height="h-56"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        {/* The priority */}
        <label htmlFor="priority">Select priority: (optional)</label>
        <select
          className="outline-1"
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

        {/* The category */}
        <label htmlFor="category">Any category: (optional)</label>
        <Input
          name={"category"}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />

        {/* The completion */}
        <label htmlFor="isCompleted">Completion: (optional)</label>
        <input
          type="checkbox"
          name="isCompleted"
          id="isCompleted"
          onClick={() => {
            // these values will be converted to boolean in the create task controller in the server
            if (isCompleted === "") {
              setIsCompleted("true");
            } else if (isCompleted === "true") {
              setIsCompleted("");
            }
          }}
        />

        {/* The button to create the task */}
        <Button content={"Create"} type={"submit"} />

        {/* The button to cancel the modal */}
        <Button content={"Cancel"} onClick={onClick} />
      </AuthCard>

      {/* The conditional message */}
      {conditionalMessage()}
    </>
  );
}

export default CreateTaskModal;
