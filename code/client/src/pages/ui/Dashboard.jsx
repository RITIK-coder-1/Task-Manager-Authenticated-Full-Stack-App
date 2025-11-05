/* ---------------------------------------------------------------------------
Dashboard.jsx
This is the dashboad page where a logged in user lands at
------------------------------------------------------------------------------ */

import React, { useEffect, useState } from "react";
import { displayAll } from "../../features/taskSlice.js";
import { get } from "../../features/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { Button, CreateTaskModal } from "../../components/index.components.js";
import useConditionalRendering from "../../hooks/useConditionalRendering.js";

function Dashboard() {
  // ----------------------------------------------------------------------------------
  // All the variables of the script
  // ----------------------------------------------------------------------------------
  const dispatch = useDispatch();
  const user = useConditionalRendering("users").message?.user;
  const tasks = useConditionalRendering("tasks").message;

  useEffect(() => {
    dispatch(get());
    dispatch(displayAll(user?._id));
  }, [get, dispatch, displayAll, user]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const displayTasks = () => {
    return tasks?.map((ele) => {
      return (
        <div key={ele._id}>
          {<img src={ele.image} className="w-36 h-36 rounded-full" /> ??
            "No Image"}
          <h1>{ele.title}</h1>
          <p>{ele.description}</p>
        </div>
      );
    });
  };

  return (
    <>
      <div className="flex flex-wrap flex-col gap-3">
        <Button
          content={"Create a task"}
          styles="w-28 h-12"
          onClick={openModal}
        />
        {!tasks || tasks?.length === 0 ? (
          <span>No tasks to display!</span>
        ) : (
          displayTasks()
        )}
      </div>
      {isModalOpen && <CreateTaskModal />}
    </>
  );
}

export default Dashboard;
