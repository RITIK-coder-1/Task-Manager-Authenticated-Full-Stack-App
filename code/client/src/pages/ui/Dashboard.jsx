/* ---------------------------------------------------------------------------
Dashboard.jsx
This is the dashboad page where a logged in user lands at
------------------------------------------------------------------------------ */

import React, { useEffect, useState } from "react";
import { displayAll } from "../../features/taskSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { Button, CreateTaskModal } from "../../components/index.components.js";
import { Link } from "react-router-dom";

function Dashboard() {
  // ----------------------------------------------------------------------------------
  // All the tasks should be displayed as soon as the component mounts
  // ----------------------------------------------------------------------------------
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(displayAll());
  }, [dispatch]);

  // ----------------------------------------------------------------------------------
  // All the variables of the script
  // ----------------------------------------------------------------------------------
  const tasks = useSelector((state) => state.tasks.tasks?.message);
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
    console.log("TASKS: ", tasks);

    return tasks?.map((ele) => {
      return (
        <Link to={`/users/me/dashboard/${ele._id}`} key={ele._id}>
          <div
            className="border w-36 h-auto p-2 flex flex-col justify-center items-center cursor-pointer"
            title={`Visit ${ele.title}`}
          >
            <h1>{ele.title}</h1>
            <p>{ele.description}</p>
          </div>
        </Link>
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
