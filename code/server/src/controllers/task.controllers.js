// ----------------------------------------------
// task.controllers.js
// This file contains all the countrollers for task routes
// ----------------------------------------------

import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import Task from "../models/Task.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import mongoose from "mongoose";

// ----------------------------------------------
// Controller to create a new task
// ----------------------------------------------

const createTaskFunction = async (req, res) => {
  // taking all the input fields from the client request
  const { title, description, priority, isCompleted, category } = req.body;
  const ownerId = req.user._id; // the owner of the task

  if (!ownerId) {
    // Only authenticated users can create tasks!
    throw new ApiError(401, "Authentication required to create a task.");
  }

  // only name is the required field, so we need to check if it is empty
  if (title?.trim() === "") {
    throw new ApiError(400, "The title of the task can't be empty!");
  }

  // checking if the priority is limited to the given options only
  const validPriorities = ["Low", "Medium", "High", "Urgent"];

  if (!priority || !validPriorities.includes(priority)) {
    throw new ApiError(
      400,
      `Invalid priority value: "${priority}". Must be one of: ${validPriorities.join(
        ", "
      )}.`
    );
  }

  // checking if isCompleted a boolean or not
  if (isCompleted !== true && isCompleted !== false) {
    throw new ApiError(400, "Completion should only be a boolean!");
  }

  // The title is compulsory and all the other fields have default values if not customized by the User
  // Once it is validated, we need to save the data in the database

  // creating a new task to save the details
  const task = await Task.create({
    title,
    description: description || "",
    priority,
    isCompleted,
    category: category || "unspecified",
    owner: ownerId,
  });

  // last validation if the task has been registered
  if (!task) {
    // MongoDB returns a document only if it is created successfully
    throw new ApiError(500, "There was a problem while creating the task!");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, task, "The task has been successfully created!")
    );
};

// ----------------------------------------------
// Controller to display all the tasks
// ----------------------------------------------

const displayAllTasksFunction = async (req, res) => {
  const userId = req.user._id; // the user id

  if (!userId) {
    // Only authenticated users can read tasks!
    throw new ApiError(401, "Authentication required to retrive task.");
  }

  // fetching details from the database
  const task = await Task.find({ owner: userId }); // only the tasks that are owned by this user

  if (!task) {
    throw new ApiError(404, "The tasks couldn't be fetched!");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        task,
        "All the tasks have been retrieved successfully!"
      )
    );
};

// ----------------------------------------------
// Controller to retrieve a particular task
// ----------------------------------------------

const retrieveTaskFunction = async (req, res) => {
  const userId = req.user?._id;
  const taskId = req.params?.taskId;

  if (!userId || !taskId) {
    throw new ApiError(400, "Invalid user or task!");
  }

  const task = await Task.findOne({ owner: userId, _id: taskId });

  if (!task) {
    throw new ApiError(404, "The task couldn't be fetched!");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        task,
        `${task?.title} has been fetched successfully!`
      )
    );
};

// ----------------------------------------------
// Controller to update a task
// ----------------------------------------------

const updateTaskFunction = async (req, res) => {
  // retrieving the data to be updated
  const { title, description, priority, isCompleted, category } = req.body;
  const taskId = req.params?.taskId; // the task id
  const userId = req.user?._id; // the user id
  const existingTask = await Task.findOne({ _id: taskId, owner: userId }); // the current task

  // checking if the task belongs to the user
  if (!existingTask) {
    throw new ApiError(
      403,
      `There was an issue in retriving the task: ${taskId} by this user: ${userId}`
    );
  }

  // checking if all the values are properly entered (only the updated ones!)

  if (title !== undefined) {
    if (title?.trim() === "") {
      throw new ApiError(400, "The title can not be empty!");
    }
  }

  if (priority !== undefined) {
    // checking if the priority is limited to the given options only
    const validPriorities = ["Low", "Medium", "High", "Urgent"];

    if (!priority || !validPriorities.includes(priority)) {
      throw new ApiError(
        400,
        `Invalid priority value: "${priority}". Must be one of: ${validPriorities.join(
          ", "
        )}.`
      );
    }
  }

  if (isCompleted !== undefined) {
    // checking if isCompleted a boolean or not
    if (isCompleted !== true && isCompleted !== false) {
      throw new ApiError(400, "Completion should only be a boolean!");
    }
  }

  // checking if all the data equal to the existing values!
  if (
    existingTask.title === title &&
    existingTask.description === description &&
    existingTask.priority === priority &&
    existingTask.isCompleted === isCompleted &&
    existingTask.category === category
  ) {
    throw new ApiError(400, "Please enter any updated value!");
  }

  // updating the entire task
  const updatedTask = {};

  // Only add a field if it is present (not undefined).
  if (title !== undefined) updatedTask.title = title;
  if (description !== undefined) updatedTask.description = description || "";
  if (priority !== undefined) updatedTask.priority = priority || "Low";
  if (isCompleted !== undefined) updatedTask.isCompleted = isCompleted || false;
  if (category !== undefined) updatedTask.category = category || "unspecified";

  const task = await Task.findByIdAndUpdate(
    taskId,
    {
      $set: updatedTask,
    },
    {
      new: true,
    }
  );

  // checking if the task is valid
  if (!task) {
    throw new ApiError(400, "The task could not be updated!");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, task, "The task has been successfully updated!")
    );
};

// ----------------------------------------------
// Controller to delete a new task
// ----------------------------------------------

const deleteTaskFunction = async (req, res) => {
  const userId = req.user?._id; // the user id
  const taskId = req.params?.taskId; // the task id

  // checking if both the ids are correct
  if (!userId) {
    throw new ApiError(400, "Invalid user!");
  }
  if (!taskId) {
    throw new ApiError(400, "Invalid Task!");
  }

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new ApiError(400, "Invalid task id format!");
  }

  // finding the task and deleting it
  const task = await Task.findOneAndDelete({ _id: taskId, owner: userId });
  if (!task) {
    console.log(task);

    throw new ApiError(
      404,
      `The particular task: ${taskId} by the user: ${userId} doesn't exist!`
    );
  }

  return res
    .status(200)
    .json(200, null, "The task has been successfully deleted!");
};

// ----------------------------------------------
// Error Handling
// ----------------------------------------------
const createTask = asyncHandler(createTaskFunction);
const displayAllTasks = asyncHandler(displayAllTasksFunction);
const updateTask = asyncHandler(updateTaskFunction);
const deleteTask = asyncHandler(deleteTaskFunction);
const retrieveTask = asyncHandler(retrieveTaskFunction);

export { createTask, displayAllTasks, updateTask, deleteTask, retrieveTask };
