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
    return response.data; // the response sent by the backend
  } catch (error) {

    throw error;
  }
};

/* ---------------------------------------------------------------------------
The function to display all the tasks
------------------------------------------------------------------------------ */

const displayAllTasks = async () => {
  try {
    const response = await api.get("/me/dashboard");

    return response.data;
  } catch (error) {

    throw error;
  }
};

/* ---------------------------------------------------------------------------
The function to get a specific task
------------------------------------------------------------------------------ */

const getTask = async (taskId) => {
  try {
    const response = await api.get(`/me/dashboard/${taskId}`);

    return response.data;
  } catch (error) {

    throw error;
  }
};

/* ---------------------------------------------------------------------------
The function to update a task
------------------------------------------------------------------------------ */

const updateTask = async (taskId, formData) => {
  try {
    const response = await api.patch(`/me/dashboard/${taskId}`, formData);
    return response.data;
  } catch (error) {

    throw error;
  }
};

/* ---------------------------------------------------------------------------
The function to delete a task
------------------------------------------------------------------------------ */

const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/me/dashboard/${taskId}`);
    return response.data;
  } catch (error) {

    throw error;
  }
};

export { createTask, displayAllTasks, updateTask, deleteTask, getTask };
