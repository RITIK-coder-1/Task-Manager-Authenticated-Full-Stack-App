/* ---------------------------------------------------------------------------
index.features.js
This file exports all the redux slices from one single place
------------------------------------------------------------------------------ */

// The reducers for the store

import taskReducer from "./taskSlice.js";
import userReducer from "./userSlice.js";
import authReducer from "./authSlice.js";

// The functions for task, user and auth slices

import {
  get as getUser,
  userUpdate,
  passwordUpdate,
  profileUpdate,
} from "./userSlice.js";
import {
  create,
  update,
  remove,
  displayAll,
  get as getTask,
} from "./taskSlice.js";
import { register, login, logout } from "./authSlice.js";

export {
  taskReducer,
  userReducer,
  authReducer,
  getUser,
  userUpdate,
  passwordUpdate,
  profileUpdate,
  create,
  update,
  remove,
  displayAll,
  getTask,
  register,
  login,
  logout,
};
