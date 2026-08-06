/* ---------------------------------------------------------------------------
userService.js
This script handles all the API calls using axios for user related queries
------------------------------------------------------------------------------ */

import api from "./axiosInstance";

/* ---------------------------------------------------------------------------
The function to fetch a user's details
------------------------------------------------------------------------------ */

const getUser = async () => {
  try {
    const response = await api.get("/me");
    return response.data;
  } catch (error) {

    throw error;
  }
};

/* ---------------------------------------------------------------------------
The function to update a user's details
------------------------------------------------------------------------------ */

const updateUser = async (updatedData) => {
  try {
    const response = await api.patch("/me/details", updatedData);

    return response.data;
  } catch (error) {

    throw error;
  }
};

/* ---------------------------------------------------------------------------
The function to update a user's password
------------------------------------------------------------------------------ */

const updatePassword = async (updatedData) => {
  try {
    const response = await api.patch("/me/password", updatedData);

    return response.data;
  } catch (error) {

    throw error;
  }
};

/* ---------------------------------------------------------------------------
The function to update a user's profile pic
------------------------------------------------------------------------------ */

const updatePic = async (profileFormData) => {
  try {
    const response = await api.patch(
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


    return response.data;
  } catch (error) {

    throw error;
  }
};

/* ---------------------------------------------------------------------------
The function to delete a user
------------------------------------------------------------------------------ */

const deleteUser = async () => {
  try {
    const response = await api.delete(
      `${import.meta.env.VITE_API_URL}/users/delete` // overriding the base URL with this specific route
    );
    return response.data;
  } catch (error) {

    throw error;
  }
};

/* ---------------------------------------------------------------------------
The function to delete the profile pic
------------------------------------------------------------------------------ */

const deleteProfilePic = async () => {
  try {
    const response = await api.delete(
      "/me/appearance",
      {},
      {
        timeout: 30000, // custom timeout for image deletion
      }
    );
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
