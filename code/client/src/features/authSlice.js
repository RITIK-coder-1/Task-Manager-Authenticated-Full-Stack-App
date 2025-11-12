/* ---------------------------------------------------------------------------
authSlice.js
This is the redux slice for authentication related queries and global state management
------------------------------------------------------------------------------ */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../services/index.services";

/* ---------------------------------------------------------------------------
The function to register a user
------------------------------------------------------------------------------ */

const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUser(userData);

      return response; // the response sent by the backend
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

/* ---------------------------------------------------------------------------
  The function to login a user
  ------------------------------------------------------------------------------ */

const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginUser(userData);
      return response; // the response sent by the backend
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

/* ---------------------------------------------------------------------------
  The function to logout a user
  ------------------------------------------------------------------------------ */

const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutUser();
      return response; // the response sent by the backend
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

/* ---------------------------------------------------------------------------
   Defining the common logic for successful authentication (login or register)
------------------------------------------------------------------------------ */
const handleAuthFulfilled = (state, action) => {
  const token = action.payload.message.accessToken;
  localStorage.setItem("accessToken", token);
  state.status = "succeeded";
  state.accessToken = token;
  state.isAuthenticated = true;
  state.navigationStatus = "succeeded";
  state.successMessage = action.payload.data;
};

/* ---------------------------------------------------------------------------
    Defining the common logic for failed authentication (login or register)
------------------------------------------------------------------------------ */
const handleAuthRejected = (state, action) => {
  state.status = "failed";
  state.error = uxErrorMessage(action.payload);
  state.isAuthenticated = false;
  state.accessToken = null;
  localStorage.removeItem("accessToken");
  state.navigationStatus = "failed";
};

/* ---------------------------------------------------------------------------
This is a custom error message for better user experience (Purely for UX)
------------------------------------------------------------------------------ */

const uxErrorMessage = (str) => {
  if (str.includes("timeout") && str.includes("exceeded")) {
    const customMessage = str.replace("t", "T");
    return `${customMessage}. Please try again!`;
  } else {
    return str; // if there is no timeout error, return the entire payload message
  }
};

/* ---------------------------------------------------------------------------
The Slice
------------------------------------------------------------------------------ */

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: localStorage.getItem("accessToken") || null,
    isAuthenticated: !!localStorage.getItem("accessToken"),
    status: "idle", // for every non-navigation related status updates (idle, pending, succeeded, failed)
    error: null,
    successMessage: null,
    navigationStatus: "idle", // this is a unqiue status that is for navigation related status updates only (idle, succeeded, failed)
  },
  reducers: {
    // action to reset the state of the user once an action is done
    resetNavStatus: (state) => {
      state.navigationStatus = "idle";
    },
    // A reducer to reset the status/error after the notification is shown/closed
    clearAuthStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    /* ---------------------------------------------------------------------------
       All the cases for registering the user 
    ------------------------------------------------------------------------------ */

    // the pending case
    builder.addCase(register.pending, (state) => {
      state.status = "pending";
      state.error = null; // clear previous errors
    });

    // the success case
    builder.addCase(register.fulfilled, handleAuthFulfilled);

    // the failure case
    builder.addCase(register.rejected, handleAuthRejected);

    /* ---------------------------------------------------------------------------
       All the cases for logging in the user 
    ------------------------------------------------------------------------------ */

    // the pending case
    builder.addCase(login.pending, (state) => {
      state.status = "pending";
      state.error = null; // clear previous errors
    });

    // the success case
    builder.addCase(login.fulfilled, handleAuthFulfilled);

    // the failure case
    builder.addCase(login.rejected, handleAuthRejected);

    /* ---------------------------------------------------------------------------
       All the cases for logging out the user 
    ------------------------------------------------------------------------------ */

    // the pending case
    builder.addCase(logout.pending, (state) => {
      state.status = "pending";
      state.error = null; // clear previous errors
    });

    // the success case
    builder.addCase(logout.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.accessToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken"); // removing the access token for credentials
      state.navigationStatus = "succeeded";
      state.successMessage = action.payload.data;
    });

    // the failure case
    builder.addCase(logout.rejected, (state, action) => {
      state.status = "failed";
      state.error = uxErrorMessage(action.payload);
      state.navigationStatus = "failed";
    });
  },
});

export const { resetNavStatus, clearAuthStatus } = authSlice.actions; // synchronous actions

export { register, login, logout }; // asynchronous actions

export default authSlice.reducer;
