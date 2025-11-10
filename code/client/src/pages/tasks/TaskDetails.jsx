/* ---------------------------------------------------------------------------
TaskDetails.jsx
This page shows the details of a specific task. The task can be updated and deleted here. 
------------------------------------------------------------------------------ */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTask, update, remove } from "../../features/index.features.js";
import {
  AuthCard,
  Button,
  Input,
  MainSection,
} from "../../components/index.components";
import useNavigation from "../../hooks/useNavigation.js";

function TaskDetails() {
  const { taskId } = useParams(); // getting the task id included in the URL
  const dispatch = useDispatch();

  // ----------------------------------------------------------------------------------
  // Get the details of the task as soon as the page mounts
  // ----------------------------------------------------------------------------------
  useEffect(() => {
    dispatch(getTask(taskId));
  }, [taskId, dispatch]);

  // ----------------------------------------------------------------------------------
  // All the variables
  // ----------------------------------------------------------------------------------
  const task = useSelector((state) => state.tasks.specificTask.message); // the task data
  console.log(task);

  const [title, setTitle] = useState(null); // the title of the task
  const [modifyTitle, setModifyTitle] = useState(false);

  const [description, setDescription] = useState(null); // the desc
  const [modifyDesc, setModifyDesc] = useState(false);

  const [priority, setPriority] = useState(null); // the priority (can be changed directly)

  const [category, setCategory] = useState(null); // the category
  const [modifyCategory, setModifyCategory] = useState(false);

  const [isCompleted, setIsCompleted] = useState(task?.isCompleted); // the completion status (can be changed directly)

  // ----------------------------------------------------------------------------------
  // I pre-loaded the current value of the task details
  // ----------------------------------------------------------------------------------
  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setPriority(task.priority || "");
      setCategory(task.category || "");
      setIsCompleted(task.isCompleted || null);
    }
  }, [
    task,
    dispatch,
    setTitle,
    setDescription,
    setPriority,
    setCategory,
    setIsCompleted,
  ]);

  const submit = (e) => {
    e.preventDefault(); // for preventing page reload
    const payload = {
      title: title,
      description: description,
      priority: priority,
      category: category,
      isCompleted: isCompleted,
    };

    const data = {
      taskId: taskId, // for URL purposes
      taskData: payload,
    };

    dispatch(update(data));
  };
  // ----------------------------------------------------------------------------------
  // Automatic navigation once the task is deleted
  // ----------------------------------------------------------------------------------
  useNavigation("tasks", "/users/me/dashboard");

  return (
    <>
      <MainSection styles="pt-22">
        <AuthCard onSubmit={submit}>
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
                if (isCompleted === true) {
                  setIsCompleted(false);
                } else if (isCompleted === false) {
                  setIsCompleted(true);
                }
              }}
            />
          </div>
          <Button content={"Update"} type={"submit"} />
          <Button
            content={"Delete"}
            onClick={() => {
              dispatch(remove(taskId));
            }}
          />
        </AuthCard>
      </MainSection>
    </>
  );
}

export default TaskDetails;
