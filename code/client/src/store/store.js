/* ---------------------------------------------------------------------------
store.js
This is the redux store for managing reducers
------------------------------------------------------------------------------ */

import { configureStore } from "@reduxjs/toolkit";
import {
  taskReducer,
  userReducer,
  authReducer,
} from "../features/index.features.js";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    users: userReducer,
    auth: authReducer,
  },
});
