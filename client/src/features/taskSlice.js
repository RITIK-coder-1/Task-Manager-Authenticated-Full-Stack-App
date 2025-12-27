/* ---------------------------------------------------------------------------
taskSlice.js
This is the slice for all the task related global state management
------------------------------------------------------------------------------ */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createTask,
  displayAllTasks,
  updateTask,
  deleteTask,
  getTask,
} from "../services/index.services.js";

/* ---------------------------------------------------------------------------
Function to display all the tasks
------------------------------------------------------------------------------ */

const displayAll = createAsyncThunk(
  "tasks/displayAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await displayAllTasks();
      return response; // the data sent by the backend
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

/* ---------------------------------------------------------------------------
Function to create a task
------------------------------------------------------------------------------ */

const create = createAsyncThunk("tasks/create", async (formData, thunkAPI) => {
  try {
    const response = await createTask(formData);
    thunkAPI.dispatch(displayAll()); // once a new task is created, re-render the entire task list
    return response; // the data sent by the backend
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message
    );
  }
});

/* ---------------------------------------------------------------------------
Function to update a task
------------------------------------------------------------------------------ */

const update = createAsyncThunk(
  "tasks/update",
  async ({ taskId, taskData }, { rejectWithValue }) => {
    try {
      const response = await updateTask(taskId, taskData);
      return response; // the data sent by the backend
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

/* ---------------------------------------------------------------------------
Function to get a task
------------------------------------------------------------------------------ */

const get = createAsyncThunk(
  "tasks/get",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await getTask(taskId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

/* ---------------------------------------------------------------------------
Function to remove a task
------------------------------------------------------------------------------ */

const remove = createAsyncThunk(
  "tasks/remove",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await deleteTask(taskId);
      return response; // the data sent by the backend
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
SLICE
------------------------------------------------------------------------------ */

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [], // it will display the list of all the tasks
    specificTask: {}, // it will display only a single task at the moment
    status: "idle", // "idle", "pending", "succeeded", "rejected"
    error: null, // the error message,
    successMessage: null, // message on success
    navigationStatus: "idle", // it's a special status used for automatic navigation upon task deletion
  },
  reducers: {
    // it resets the navigation status upon action completion
    resetTaskNav: (state) => {
      state.navigationStatus = "idle";
    },
    // A reducer to reset the status/error after the notification is shown/closed
    clearTaskStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    /* ---------------------------------------------------------------------------
      All the cases for creating a task
    ------------------------------------------------------------------------------ */

    // the pending case
    builder.addCase(create.pending, (state) => {
      state.status = "pending";
      state.error = null; // clear previous errors
    });

    // the success case
    builder.addCase(create.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.tasks.push(action.payload.message);
      state.successMessage = action.payload.data;
    });

    // the failure case
    builder.addCase(create.rejected, (state, action) => {
      state.status = "failed";
      state.error = uxErrorMessage(action.payload);
    });

    /* ---------------------------------------------------------------------------
      All the cases for updating a task
    ------------------------------------------------------------------------------ */

    // the pending case
    builder.addCase(update.pending, (state) => {
      state.status = "pending";
      state.error = null; // clear previous errors
    });

    // the success case
    builder.addCase(update.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.specificTask = action.payload.message;
      state.successMessage = action.payload.data;
    });

    // the failure case
    builder.addCase(update.rejected, (state, action) => {
      state.status = "failed";
      state.error = uxErrorMessage(action.payload);
    });

    /* ---------------------------------------------------------------------------
      All the cases for removing a task
    ------------------------------------------------------------------------------ */

    // the pending case
    builder.addCase(remove.pending, (state) => {
      state.status = "pending";
      state.error = null; // clear previous errors
    });

    // the success case
    builder.addCase(remove.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.navigationStatus = "succeeded";
      state.successMessage = action.payload.data;
    });

    // the failure case
    builder.addCase(remove.rejected, (state, action) => {
      state.status = "failed";
      state.error = uxErrorMessage(action.payload);
      state.navigationStatus = "failed";
    });

    /* ---------------------------------------------------------------------------
      All the cases for displaying all the tasks
    ------------------------------------------------------------------------------ */

    // the pending case
    builder.addCase(displayAll.pending, (state) => {
      state.error = null; // clear previous errors
    });

    // the success case
    builder.addCase(displayAll.fulfilled, (state, action) => {
      state.tasks = action.payload.message;
    });

    // the failure case
    builder.addCase(displayAll.rejected, (state, action) => {
      state.error = uxErrorMessage(action.payload);
    });

    /* ---------------------------------------------------------------------------
      All the cases for getting a specific task
    ------------------------------------------------------------------------------ */

    // the pending case
    builder.addCase(get.pending, (state) => {
      state.status = "pending";
      state.error = null; // clear previous errors
    });

    // the success case
    builder.addCase(get.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.specificTask = action.payload.message;
      state.successMessage = action.payload.data;
    });

    // the failure case
    builder.addCase(get.rejected, (state, action) => {
      state.status = "failed";
      state.error = uxErrorMessage(action.payload);
    });
  },
});

export const { resetTaskNav, clearTaskStatus } = taskSlice.actions; // synchronous actions

export { create, update, remove, displayAll, get };

export default taskSlice.reducer;
