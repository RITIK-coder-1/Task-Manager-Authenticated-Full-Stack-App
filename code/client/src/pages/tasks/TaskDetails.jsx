/* ---------------------------------------------------------------------------
TaskDetails.jsx
This page shows the details of a specific task
------------------------------------------------------------------------------ */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTask } from "../../features/index.features";
import { AuthCard, Input } from "../../components/index.components";

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

  const [title, setTitle] = useState(task?.title);
  const [modifyTitle, setModifyTitle] = useState(false);

  const [description, setDescription] = useState(task?.description);
  const [modifyDesc, setModifyDesc] = useState(false);

  const [priority, setPriority] = useState(task?.priority);

  const [category, setCategory] = useState(task?.category);
  const [modifyCategory, setModifyCategory] = useState(false);

  const [isCompleted, setIsCompleted] = useState(task?.isCompleted);

  const submit = () => {
    const payload = {
      title: title,
      description: description,
      priority: priority,
      category: category,
      isCompleted: isCompleted,
    };
  };

  return (
    <>
      <AuthCard>
        {/* The title of the task */}
        <div className="flex justify-between items-center gap-2">
          <Input
            styles={`w-full text-black text-3xl cursor-auto ${
              modifyTitle ? "outline-1 cursor-alias" : "outline-0"
            }`}
            value={title}
            readOnly={modifyTitle ? false : true}
            name={"title"}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <div
            className="bg-yellow-400 rounded-full w-6 h-6 cursor-pointer"
            onClick={() => {
              setModifyTitle(!modifyTitle);
            }}
          ></div>
        </div>

        {/* The description of the task */}
        <div className="flex justify-between items-center gap-2">
          <Input
            styles={`w-full h-72 cursor-auto ${
              modifyDesc ? "outline-1 cursor-alias" : "outline-0"
            }`}
            value={description}
            readOnly={modifyDesc ? false : true}
            name={"description"}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <div
            className="bg-yellow-400 rounded-full w-6 h-6 cursor-pointer"
            onClick={() => {
              setModifyDesc(!modifyDesc);
            }}
          ></div>
        </div>

        {/* The priority of the task */}
        <div className="flex justify-between items-center gap-2">
          <select
            className="outline-1"
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
            }}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Urgent</option>
          </select>
        </div>

        {/* The category of the task */}
        <div className="flex justify-between items-center gap-2">
          <Input
            styles={`w-full cursor-auto ${
              modifyCategory ? "outline-1 cursor-alias" : "outline-0"
            }`}
            value={category}
            readOnly={modifyCategory ? false : true}
            name={"category"}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          <div
            className="bg-yellow-400 rounded-full w-6 h-6 cursor-pointer"
            onClick={() => {
              setModifyCategory(!modifyCategory);
            }}
          ></div>
        </div>

        {/* The completion status of the task */}
        <div className="flex justify-start items-center gap-2">
          <label htmlFor="isCompleted">Completed: </label>
          <input
            type="checkbox"
            name="isCompleted"
            id="isCompleted"
            defaultChecked={isCompleted ? true : false}
            onClick={() => {
              // these values will be converted to boolean in the create task controller in the server
              if (isCompleted === true) {
                setIsCompleted("");
              } else if (isCompleted === false) {
                setIsCompleted("true");
              }
            }}
          />
        </div>
      </AuthCard>
    </>
  );
}

export default TaskDetails;
