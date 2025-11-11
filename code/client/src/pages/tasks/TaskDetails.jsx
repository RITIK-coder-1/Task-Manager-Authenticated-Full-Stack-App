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
  MainSection,
  TaskInput,
} from "../../components/index.components";
import useNavigation from "../../hooks/useNavigation.js";
import useConditionalRendering from "../../hooks/useConditionalRendering.js";

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
  const { status, error } = useConditionalRendering("tasks");

  const [title, setTitle] = useState(null); // the title of the task
  const [modifyTitle, setModifyTitle] = useState(false);

  const [description, setDescription] = useState(null); // the desc
  const [modifyDesc, setModifyDesc] = useState(false);

  const [priority, setPriority] = useState(null); // the priority (can be changed directly)

  const [category, setCategory] = useState(null); // the category
  const [modifyCategory, setModifyCategory] = useState(false);

  const [isCompleted, setIsCompleted] = useState(null); // the completion status (can be changed directly)

  // ----------------------------------------------------------------------------------
  // I pre-loaded the current value of the task details
  // ----------------------------------------------------------------------------------
  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setPriority(task.priority || "");
      setCategory(task.category || "");
      setIsCompleted(Boolean(task.isCompleted) || false);
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
      <MainSection styles="pt-22 pb-5 px-3">
        {status === "pending" ? (
          <span className="text-5xl">Loading data...</span>
        ) : (
          <AuthCard onSubmit={submit} width="w-full md:w-[600px] lg:w-[800px]">
            {/* The title of the task */}
            <TaskInput
              styles="font-black text-3xl md:text-4xl"
              value={title}
              modifyMethod={modifyTitle}
              setMethod={setTitle}
              setModifyMethod={setModifyTitle}
              label="Title"
            />

            {/* The description of the task (multiline)*/}
            <TaskInput
              styles="h-auto md:text-lg"
              value={description}
              modifyMethod={modifyDesc}
              setMethod={setDescription}
              setModifyMethod={setModifyDesc}
              label="Description"
              multiline={true}
              placeholder={description === "" ? "No description..." : ""}
              rows={description !== "" ? 20 : ""}
              border="border border-gray-200"
            />

            {/* The priority of the task */}
            <div className="flex flex-col justify-center items-start w-full gap-2">
              <label
                htmlFor={"priority"}
                className="text-[12px] text-gray-600 md:text-lg"
              >
                Priority
              </label>
              <select
                className="outline-1 w-full py-2 rounded-md outline-gray-700 bg-gray-100 cursor-pointer md:text-lg"
                value={priority}
                onChange={(e) => {
                  setPriority(e.target.value);
                }}
                name="priority"
                id="priority"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>

            {/* The category of the task */}
            <TaskInput
              styles="md:text-lg"
              value={category}
              modifyMethod={modifyCategory}
              setMethod={setCategory}
              setModifyMethod={setModifyCategory}
              label="Category"
            />

            {/* The completion status of the task */}
            <div className="flex w-full justify-start items-center gap-2">
              <label htmlFor="isCompleted" className="text-gray-700">
                Completed:{" "}
              </label>
              <input
                type="checkbox"
                name="isCompleted"
                id="isCompleted"
                value={isCompleted}
                defaultChecked={isCompleted ? true : false}
                onClick={() => {
                  setIsCompleted(!isCompleted);
                }}
                className="cursor-pointer text-3xl"
              />
            </div>
            <Button
              content={"Update"}
              type={"submit"}
              width="w-full md:w-88"
              bgColor="bg-blue-800 hover:bg-blue-900"
            />
            <Button
              content={"Delete"}
              onClick={() => {
                dispatch(remove(taskId));
              }}
              width="w-full md:w-88"
              bgColor="bg-red-800 hover:bg-red-900"
            />
          </AuthCard>
        )}
      </MainSection>
    </>
  );
}

export default TaskDetails;
