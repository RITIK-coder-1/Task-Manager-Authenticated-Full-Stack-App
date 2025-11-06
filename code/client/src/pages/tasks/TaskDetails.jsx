/* ---------------------------------------------------------------------------
TaskDetails.jsx
This page shows the details of a specific task
------------------------------------------------------------------------------ */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTask } from "../../features/index.features";

function TaskDetails() {
  // ----------------------------------------------------------------------------------
  // All the variables
  // ----------------------------------------------------------------------------------
  const { taskId } = useParams(); // getting the task id included in the URL
  const dispatch = useDispatch();

  // ----------------------------------------------------------------------------------
  // Get the details of the task as soon as the page mounts
  // ----------------------------------------------------------------------------------
  useEffect(() => {
    dispatch(getTask(taskId));
  }, [taskId, dispatch]);

  const task = useSelector((state) => state.tasks.specificTask.message); // the task data

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-black text-3xl">{task.title}</h1>
        <p>{task.description}</p>
        <span>Category: {task.category}</span>
        <span>Priority: {task.priority}</span>
        <span>Completion: {String(task.isCompleted)}</span>
      </div>
    </>
  );
}

export default TaskDetails;
