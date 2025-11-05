/* ---------------------------------------------------------------------------
Dashboard.jsx
This is the dashboad page where a logged in user lands at
------------------------------------------------------------------------------ */

import React, { useEffect, useState } from "react";
import { displayAll } from "../../features/taskSlice.js";
import { useDispatch } from "react-redux";
import { Button, CreateTaskModal } from "../../components/index.components.js";
import useConditionalRendering from "../../hooks/useConditionalRendering.js";

function Dashboard() {
  // ----------------------------------------------------------------------------------
  // All the tasks should be displayed as soon as the component mounts
  // ----------------------------------------------------------------------------------
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(displayAll());
  }, []);

  // ----------------------------------------------------------------------------------
  // All the variables of the script
  // ----------------------------------------------------------------------------------
  const tasks = useConditionalRendering("tasks").tasks?.message;
  const [isModalOpen, setIsModalOpen] = useState(false); // the condition for opening the create task modal

  // ----------------------------------------------------------------------------------
  // The functions to open and close the modal
  // ----------------------------------------------------------------------------------
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // ----------------------------------------------------------------------------------
  // The function to display all the tasks in the UI
  // ----------------------------------------------------------------------------------

  const displayTasks = () => {
    return tasks?.map((ele) => {
      return (
        <div
          key={ele._id}
          className="border w-36 h-auto p-2 flex flex-col justify-center items-center"
        >
          <h1>{ele.title}</h1>
          <p>{ele.description}</p>
        </div>
      );
    });
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {/* The button to create a task */}
        <Button
          content={"Create a task"}
          styles="w-28 h-12"
          onClick={openModal}
        />

        {/* All the tasks */}
        {!tasks || tasks?.length === 0 ? (
          <span>No tasks to display!</span> // conditional message if there is no task
        ) : (
          displayTasks()
        )}
      </div>

      {/* The modal */}
      {isModalOpen && <CreateTaskModal onClick={closeModal} />}
    </>
  );
}

export default Dashboard;
