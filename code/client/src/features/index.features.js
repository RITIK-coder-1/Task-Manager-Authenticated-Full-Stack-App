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
  clearUserStatus,
  userDelete,
  resetUserNav,
} from "./userSlice.js";

import {
  create,
  update,
  remove,
  displayAll,
  get as getTask,
  resetTaskNav,
  clearTaskStatus,
} from "./taskSlice.js";

import {
  register,
  login,
  logout,
  resetAuthNav,
  clearAuthStatus,
} from "./authSlice.js";

export {
  taskReducer,
  userReducer,
  authReducer,
  getUser,
  userUpdate,
  passwordUpdate,
  profileUpdate,
  clearUserStatus,
  userDelete,
  resetUserNav,
  create,
  update,
  remove,
  displayAll,
  getTask,
  clearTaskStatus,
  resetTaskNav,
  register,
  login,
  logout,
  resetAuthNav,
  clearAuthStatus,
};
