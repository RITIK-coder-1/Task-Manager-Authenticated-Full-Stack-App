/* ---------------------------------------------------------------------------
Dashboard.jsx
This is the dashboad page where a logged in user lands at
------------------------------------------------------------------------------ */

import React, { useEffect, useState } from "react";
import { displayAll } from "../../features/taskSlice.js";
import { useDispatch } from "react-redux";
import {
  Button,
  CreateTaskModal,
  MainSection,
} from "../../components/index.components.js";
import { Link } from "react-router-dom";
import useConditionalRendering from "../../hooks/useConditionalRendering.js";

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
  const { status, tasks } = useConditionalRendering("tasks");
  const { user } = useConditionalRendering("users");
  const [isModalOpen, setIsModalOpen] = useState(false); // the condition for opening the create task modal

  // ----------------------------------------------------------------------------------
  // The functions to open and close the modal
  // ----------------------------------------------------------------------------------
  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // ----------------------------------------------------------------------------------
  // The function to display all the tasks in the UI
  // ----------------------------------------------------------------------------------

  const displayTasks = () => {
    return tasks?.map((ele) => {
      // for displaying the creation date of each task
      const myDate = new Date(ele.createdAt);
      const day = myDate.getDate(); // the day number
      const formatter = new Intl.DateTimeFormat("en-US", { month: "short" });
      const monthNameLocalized = formatter.format(myDate); // the month word
      const createdAt = `${monthNameLocalized} ${day}`; // the final string to display

      return (
        <Link
          className="group cursor-pointer w-full flex flex-col hover:shadow-xl transition-shadow duration-300 lg:hover:shadow-2xl rounded-xl"
          to={`/users/me/dashboard/${ele._id}`}
          title={`Visit ${ele.title}`}
          key={ele._id}
        >
          <div className="w-full h-18 pt-5 px-3 overflow-hidden font-semibold rounded-t-xl bg-white flex flex-col justify-start items-start gap-1 cursor-pointer relative z-10 text-xl sm:h-26 sm:text-2xl lg:h-32 lg:text-3xl">
            <h1 className="group-hover:text-blue-800 transition-colors duration-200">
              {ele.title}
            </h1>
            <p className="text-xs/snug sm:text-sm/6 font-light text-gray-700 relative z-10">
              {ele.description === "" ? "No description..." : ele.description}
            </p>
          </div>
          {/* For displaying the date */}
          <span className="h-6 pl-3 pt-1 text-xs bg-white w-full font-light text-gray-600 rounded-b-xl shadow-md shadow-gray-300 sm:text-sm sm:h-8">
            {createdAt}
          </span>
        </Link>
      );
    });
  };

  return (
    <>
      {/* The task creation modal */}
      {isModalOpen && (
        <div
          className="w-full h-screen fixed inset-0 z-100 flex justify-center items-center overflow-y-auto pb-5 pt-30 sm:pt-45 md:pt-60 lg:pt-77 lg:pb-10"
          // 2. Backdrop styling: black background with 50% opacity and blur effect
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(10px)",
          }}
          onClick={closeModal}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <CreateTaskModal onClick={closeModal} />
          </div>
        </div>
      )}

      {/* The main section */}
      <MainSection styles="pt-24 pb-16">
        {user ? (
          <section className="w-full h-full flex flex-wrap justify-center gap-4 px-3 sm:px-6 md:px-10">
            {status === "pending" ? (
              <span className="text-5xl">Loading Data...</span>
            ) : !tasks || tasks?.length === 0 ? (
              <span className="text-gray-600 italic">No tasks to display!</span> // conditional message if there is no task
            ) : (
              displayTasks()
            )}

            {/* The button to create a task */}
            <div className="w-full h-full flex items-end justify-end pr-4">
              <Button
                content={"+"}
                styles="fixed h-18 rounded-full text-4xl bottom-24 right-6 z-100 sm:h-22 sm:text-5xl"
                width="w-18 sm:w-22"
                onClick={openModal}
                title={"Add Task"}
              />
            </div>
          </section>
        ) : (
          <span className="text-xl italic text-center sm:ml-15">
            Your session expired. Please restart the app and{" "}
            <Link to="/users/login">
              <strong className="underline hover:text-blue-900" title="login">
                Login
              </strong>
            </Link>{" "}
            again.
          </span>
        )}
      </MainSection>
    </>
  );
}

export default Dashboard;
