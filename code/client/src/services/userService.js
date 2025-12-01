/* ---------------------------------------------------------------------------
userService.js
This script handles all the API calls using axios for user related queries
------------------------------------------------------------------------------ */

import axios from "axios";

const userAxios = axios.create({
  // baseURL: `${import.meta.env.VITE_API_URL}/users`,
  baseURL: "http://0.0.0.0:3000/api/v1/users", // ONLY FOR TESTING PURPOSES
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ---------------------------------------------------------------------------
The axios request interceptor for credentials
------------------------------------------------------------------------------ */

userAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    // If the token exists, attach it to the Headers
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  // Error handling if the request config fails
  (error) => {
    return Promise.reject(error);
  }
);

/* ---------------------------------------------------------------------------
The axios response interceptor for refreshing on token expiry
------------------------------------------------------------------------------ */

// (IT'S CURRENTLY IN DEVELOPMENT!!!)

userAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    console.log("error");

    // Token expired (401/403) AND I haven't retried before
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Calling the refresh token controller
        const refreshRes = await userAxios.get("me/token", {
          withCredentials: true,
        });

        const newAccessToken = refreshRes.data.accessToken;

        // Saving the new token for future requests
        localStorage.setItem("accessToken", newAccessToken);

        // Attaching token to the ORIGINAL failed request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retring the original request with new token
        return userAxios(originalRequest);
      } catch (refreshError) {
        // If refresh failed then clear tokens and logout
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      }
    }

    // If not token issue, reject normally
    return Promise.reject(error);
  }
);

/* ---------------------------------------------------------------------------
The function to fetch a user's details
------------------------------------------------------------------------------ */

const getUser = async () => {
  try {
    const response = await userAxios.get("/me");
    console.log("The user has been successfully fetched! :", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "There was an error while fetching the user's details : ",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

/* ---------------------------------------------------------------------------
The function to update a user's details
------------------------------------------------------------------------------ */

const updateUser = async (updatedData) => {
  try {
    const response = await userAxios.patch("/me/details", updatedData);
    console.log(
      "The details of the user has been successfully updated! :",
      response.data
    );
    return response.data;
  } catch (error) {
    console.error(
      "There was an error while updating the user's details : ",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

/* ---------------------------------------------------------------------------
The function to update a user's password
------------------------------------------------------------------------------ */

const updatePassword = async (updatedData) => {
  try {
    const response = await userAxios.patch("/me/password", updatedData);
    console.log(
      "The password of the user has been successfully updated! :",
      response.data
    );
    return response.data;
  } catch (error) {
    console.error(
      "There was an error while updating the user's password : ",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

/* ---------------------------------------------------------------------------
The function to update a user's profile pic
------------------------------------------------------------------------------ */

const updatePic = async (profileFormData) => {
  try {
    const response = await userAxios.patch(
      "/me/appearance",
      profileFormData, // The file data payload
      {
        headers: {
          // It forces Axios to let the browser set the correct 'multipart/form-data' header.
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000, // custom timeout for image upload
      }
    );

    console.log(
      "The profile pic of the user has been successfully updated! :",
      response.data
    );
    return response.data;
  } catch (error) {
    console.error(
      "There was an error while updating the user's profile : ",
      error.response?.data?.message || error.message,
      "Status:",
      error.response?.status
    );
    throw error;
  }
};

/* ---------------------------------------------------------------------------
The function to delete a user
------------------------------------------------------------------------------ */

const deleteUser = async () => {
  try {
    const response = await userAxios.delete("/delete");
    console.log("The user has been successfully deleted: ", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "There was an error while deleting the user : ",
      error.response?.data?.message || error.message,
      "Status:",
      error.response?.status
    );
    throw error;
  }
};

/* ---------------------------------------------------------------------------
The function to delete the profile pic
------------------------------------------------------------------------------ */

const deleteProfilePic = async () => {
  try {
    const response = await userAxios.delete("/me/appearance", {
      timeout: 30000, // custom timeout for image deletion
    });
    console.log(
      "The profile pic has been successfully deleted: ",
      response.data
    );
    return response.data;
  } catch (error) {
    console.error(
      "There was an error while deleting the profile pic : ",
      error.response?.data?.message || error.message,
      "Status:",
      error.response?.status
    );
    throw error;
  }
};

export {
  getUser,
  updateUser,
  updatePassword,
  updatePic,
  deleteUser,
  deleteProfilePic,
};
