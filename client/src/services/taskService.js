/* ---------------------------------------------------------------------------
taskService.js
This script handles all the API calls using axios for task related queries
------------------------------------------------------------------------------ */

import api from "./axiosInstance";

/* ---------------------------------------------------------------------------
The function to create a task
------------------------------------------------------------------------------ */

const createTask = async (formData) => {
  try {
    const response = await api.post("/me/dashboard", formData);
    console.log("Task successfully created!: ", response.data);
    return response.data; // the response sent by the backend
  } catch (error) {
    console.error(
      "There was an error while creating the task: ",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

/* ---------------------------------------------------------------------------
The function to display all the tasks
------------------------------------------------------------------------------ */

const displayAllTasks = async () => {
  try {
    const response = await api.get("/me/dashboard");
    console.log("Tasks successfully retrieved!: ", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "There was a problem while retrieving the tasks: ",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

/* ---------------------------------------------------------------------------
The function to get a specific task
------------------------------------------------------------------------------ */

const getTask = async (taskId) => {
  try {
    const response = await api.get(`/me/dashboard/${taskId}`);
    console.log(
      `${response.data.message.title} has been fetched successfully!`,
      response.data
    );
    return response.data;
  } catch (error) {
    console.error(
      "There was a problem while retrieving the task: ",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

/* ---------------------------------------------------------------------------
The function to update a task
------------------------------------------------------------------------------ */

const updateTask = async (taskId, formData) => {
  try {
    const response = await api.patch(`/me/dashboard/${taskId}`, formData);
    console.log("Task successfully updated!: ", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "There was a problem while updating the task: ",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

/* ---------------------------------------------------------------------------
The function to delete a task
------------------------------------------------------------------------------ */

const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/me/dashboard/${taskId}`);
    console.log("Task successfully deleted!: ", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "There was a problem while deleting the task: ",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export { createTask, displayAllTasks, updateTask, deleteTask, getTask };
