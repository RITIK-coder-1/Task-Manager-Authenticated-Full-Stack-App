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
    const response = await api.patch("/me/details", updatedData);
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
    const response = await api.patch("/me/password", updatedData);
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
    const response = await api.delete(
      `${import.meta.env.VITE_API_URL}/users/delete` // overriding the base URL with this specific route
    );
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
