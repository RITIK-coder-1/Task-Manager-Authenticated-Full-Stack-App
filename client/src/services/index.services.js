/* ---------------------------------------------------------------------------
index.service.js
This script exports all the auth, user and task related API calls from a single place
------------------------------------------------------------------------------ */

// auth API calls
import { registerUser, loginUser, logoutUser } from "./authService";

// user API calls
import {
  getUser,
  updatePassword,
  updatePic,
  updateUser,
  deleteUser,
  deleteProfilePic,
} from "./userService";

// task API calls
import {
  createTask,
  displayAllTasks,
  updateTask,
  deleteTask,
  getTask,
} from "./taskService";

export {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  updatePassword,
  updatePic,
  deleteProfilePic,
  createTask,
  displayAllTasks,
  updateTask,
  deleteTask,
  getTask,
  deleteUser,
};
