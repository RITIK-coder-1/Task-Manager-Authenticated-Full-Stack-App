/* ---------------------------------------------------------------------------
userSlice.js
This is the slice for all the user related global state management
------------------------------------------------------------------------------ */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUser,
  updateUser,
  updatePassword,
  updatePic,
} from "../services/index.services.js";

/* ---------------------------------------------------------------------------
The function to fetch a user
------------------------------------------------------------------------------ */

const get = createAsyncThunk("users/get", async (_, { rejectWithValue }) => {
  try {
    const response = await getUser();
    return response; // the response sent by the backend
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

/* ---------------------------------------------------------------------------
The function to update a user
------------------------------------------------------------------------------ */

const userUpdate = createAsyncThunk(
  "users/userUpdate",
  async (updatedData, { rejectWithValue }) => {
    try {
      const response = await updateUser(updatedData);
      return response; // the response sent by the backend
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

/* ---------------------------------------------------------------------------
The function to update the password
------------------------------------------------------------------------------ */

const passwordUpdate = createAsyncThunk(
  "users/passwordUpdate",
  async (updatedData, { rejectWithValue }) => {
    try {
      const response = await updatePassword(updatedData);
      return response; // the response sent by the backend
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

/* ---------------------------------------------------------------------------
The function to update the profile pic
------------------------------------------------------------------------------ */

const profileUpdate = createAsyncThunk(
  "users/profileUpdate",
  async (profileFormData, { rejectWithValue }) => {
    try {
      const response = await updatePic(profileFormData);
      return response; // the response sent by the backend
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

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

const userSlice = createSlice({
  name: "users",
  initialState: {
    user: null, // will hold the fetched data
    status: "idle", // idle, pending, succeeded, failed
    error: null, // will hold any error message
  },
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    /* ---------------------------------------------------------------------------
       All the cases for getting a user
    ------------------------------------------------------------------------------ */

    // the pending case
    builder.addCase(get.pending, (state) => {
      state.status = "pending";
      state.error = null; // clear previous errors
    });

    // the success case
    builder.addCase(get.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
    });

    // the failure case
    builder.addCase(get.rejected, (state, action) => {
      state.status = "failed";
      state.error = uxErrorMessage(action.payload);
      state.user = null; // clear data on failure
    });

    /* ---------------------------------------------------------------------------
       All the cases for updating a user
    ------------------------------------------------------------------------------ */

    // the pending case
    builder.addCase(userUpdate.pending, (state) => {
      state.status = "pending";
      state.error = null; // clear previous errors
    });

    // the success case
    builder.addCase(userUpdate.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
    });

    // the failure case
    builder.addCase(userUpdate.rejected, (state, action) => {
      state.status = "failed";
      state.error = uxErrorMessage(action.payload);
    });

    /* ---------------------------------------------------------------------------
       All the cases for updating the password
    ------------------------------------------------------------------------------ */

    // the pending case
    builder.addCase(passwordUpdate.pending, (state) => {
      state.status = "pending";
      state.error = null; // clear previous errors
    });

    // the success case
    builder.addCase(passwordUpdate.fulfilled, (state, action) => {
      state.status = "succeeded";
    });

    // the failure case
    builder.addCase(passwordUpdate.rejected, (state, action) => {
      state.status = "failed";
      state.error = uxErrorMessage(action.payload);
      state.user = null; // clear data on failure
    });

    /* ---------------------------------------------------------------------------
       All the cases for updating the profile pic
    ------------------------------------------------------------------------------ */

    // the pending case
    builder.addCase(profileUpdate.pending, (state) => {
      state.status = "pending";
      state.error = null; // clear previous errors
    });

    // the success case
    builder.addCase(profileUpdate.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
    });

    // the failure case
    builder.addCase(profileUpdate.rejected, (state, action) => {
      state.status = "failed";
      state.error = uxErrorMessage(action.payload);
    });
  },
});

export const { resetStatus } = userSlice.actions; // synchronous actions

export { get, userUpdate, passwordUpdate, profileUpdate };

export default userSlice.reducer;
