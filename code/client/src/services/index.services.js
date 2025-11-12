/* ---------------------------------------------------------------------------
index.service.js
This script exports all the auth, user and task related API calls from a single place
------------------------------------------------------------------------------ */

// auth API calls
import { registerUser } from "./authService";
import { loginUser } from "./authService";
import { logoutUser } from "./authService";

// user API calls
import { getUser } from "./userService";
import { updateUser } from "./userService";
import { updatePassword } from "./userService";
import { updatePic } from "./userService";
import { deleteUser } from "./userService";

// task API calls
import { createTask } from "./taskService";
import { displayAllTasks } from "./taskService";
import { updateTask } from "./taskService";
import { deleteTask } from "./taskService";
import { getTask } from "./taskService";

export {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  updatePassword,
  updatePic,
  createTask,
  displayAllTasks,
  updateTask,
  deleteTask,
  getTask,
  deleteUser,
};
