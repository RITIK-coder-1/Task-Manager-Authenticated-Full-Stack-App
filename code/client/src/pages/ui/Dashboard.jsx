/* ---------------------------------------------------------------------------
Dashboard.jsx
This is the dashboad page where a logged in user lands at
------------------------------------------------------------------------------ */

import React, { useEffect, useState } from "react";
import { displayAll } from "../../features/taskSlice.js";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  CreateTaskModal,
  MainSection,
} from "../../components/index.components.js";
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
      // for displaying the creation date of each task
      const myDate = new Date(ele.createdAt);
      const day = myDate.getDate(); // the day number
      const formatter = new Intl.DateTimeFormat("en-US", { month: "short" });
      const monthNameLocalized = formatter.format(myDate); // the month word
      const createdAt = `${monthNameLocalized} ${day}`; // the final string to display

      return (
        <>
          <div className="w-full flex flex-col">
            <Link
              to={`/users/me/dashboard/${ele._id}`}
              key={ele._id}
              className="w-full h-18 pt-5 px-3 overflow-hidden font-semibold rounded-t-xl bg-white flex flex-col justify-start items-start gap-1 cursor-pointer relative z-10 text-xl"
              title={`Visit ${ele.title}`}
            >
              <h1>{ele.title}</h1>
              <p className="text-xs/snug font-light text-gray-900 relative z-10">
                {ele.description === "" ? "No description..." : ele.description}
              </p>
            </Link>
            {/* For displaying the date */}
            <span className="h-6 pl-3 text-xs bg-white w-full font-light text-gray-700 rounded-b-xl shadow-md">
              {createdAt}
            </span>
          </div>
        </>
      );
    });
  };

  return (
    <>
      {/* The main section */}
      <MainSection styles="pt-22">
        <section className="w-full h-full flex flex-wrap gap-3 z-10">
          {/* All the tasks */}
          {!tasks || tasks?.length === 0 ? (
            <span>No tasks to display!</span> // conditional message if there is no task
          ) : (
            displayTasks()
          )}

          {/* The button to create a task */}
          <div className="w-full h-full flex items-end justify-end pr-2">
            <Button
              content={"+"}
              styles="fixed h-12 rounded-full text-md bottom-20 z-1000"
              width="w-12"
              onClick={openModal}
              title={"Add Task"}
            />
          </div>
        </section>
      </MainSection>
      {/* The modal */}
      {isModalOpen && <CreateTaskModal onClick={closeModal} />}
    </>
  );
}

export default Dashboard;
