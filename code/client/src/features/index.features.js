/* ---------------------------------------------------------------------------
index.features.js
This file exports all the redux slices from one single place
------------------------------------------------------------------------------ */

// The reducers for the store

import taskReducer from "./taskSlice.js";
import userReducer from "./userSlice.js";
import authReducer from "./authSlice.js";

// The functions for task, user and auth slices

import { getUser, updateUser, updatePassword, updatePic } from "./userSlice.js";
import { create, update, remove, displayAll, get } from "./taskSlice.js";
import { register, login, logout } from "./authSlice.js";

export {
  taskReducer,
  userReducer,
  authReducer,
  getUser,
  updateUser,
  updatePassword,
  updatePic,
  create,
  update,
  remove,
  displayAll,
  get,
  register,
  login,
  logout,
};
