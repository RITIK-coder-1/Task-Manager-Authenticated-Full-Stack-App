/* ---------------------------------------------------------------------------
authService.js
This script handles all the API calls using axios for authentication
------------------------------------------------------------------------------ */

import api from "./axiosInstance";

/* ---------------------------------------------------------------------------
The function to register a user
------------------------------------------------------------------------------ */
const registerUser = async (userData) => {
  try {
    const response = await api.post(
      "/register",
      userData, // The file data payload
      {
        headers: {
          // It forces Axios to let the browser set the correct 'multipart/form-data' header (Because a user can upload the profile pic while registering).
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000, // custom timeout for file related operations
      }
    );
    console.log("User successfully registered!", response.data);
    return response.data; // the response sent by the backend
  } catch (error) {
    console.log(
      "Registration Failed: ",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

/* ---------------------------------------------------------------------------
  The function to login a user
  ------------------------------------------------------------------------------ */
const loginUser = async (userData) => {
  try {
    const response = await api.post("/login", userData);
    console.log("User successfully logged in!", response.data);
    return response.data;
  } catch (error) {
    console.log(
      "Login Failed: ",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

/* ---------------------------------------------------------------------------
  The function to logout a user
  ------------------------------------------------------------------------------ */

const logoutUser = async () => {
  try {
    const response = await api.post("/logout");
    console.log("The user has been successfully logged out: ", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "There was a problem while logging the user out: ",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export { registerUser, loginUser, logoutUser };
