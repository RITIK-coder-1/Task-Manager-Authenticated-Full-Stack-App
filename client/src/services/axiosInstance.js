/* ---------------------------------------------------------------------------
axiosInstance.js
This script creates a centralized axios instance for API calls and adds interceptors for credentials
------------------------------------------------------------------------------ */

import axios from "axios";

/* ---------------------------------------------------------------------------
The axios instance
------------------------------------------------------------------------------ */

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/users`,
  // baseURL: "http://localhost:3000/api/v1/users", // ONLY FOR TESTING PURPOSES
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // for the refresh cookie
});

/* ---------------------------------------------------------------------------
The axios request interceptor for adding the access token to every request 
------------------------------------------------------------------------------ */

api.interceptors.request.use(
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
The axios response interceptor for refreshing the access token on expiration
------------------------------------------------------------------------------ */

let isRefreshing = false;
let failedQueue = [];

// Helper function to process the waiting room
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // handling Server Meltdown (500)
    if (error.response?.status === 500) {
      console.error("Server Error: Something went wrong on the backend.");
      return Promise.reject(error);
    }

    // handling Authentication Issues (401 or 403)
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      // If the failure happened during logging in, don't refresh. Just let the error pass through so the UI can show "Wrong Credentials"
      if (
        originalRequest.url.includes("/login") ||
        originalRequest.url.includes("/register")
      ) {
        return Promise.reject(error);
      }

      // Prevent infinite loops if the refresh call itself fails
      if (originalRequest.url.includes("/token")) {
        isRefreshing = false;
        localStorage.removeItem("accessToken");
        window.location.href = "/users/login"; // redirect to the login page
        return Promise.reject(error);
      }

      // If a refresh is already in progress, put this request in the "Waiting Room"
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true; // lock the door

      try {
        console.log(`Locking refresh for ${error.response.status}...`);

        const response = await api.post("/token");
        const { accessToken } = response.data.message;

        localStorage.setItem("accessToken", accessToken);

        // update the global headers for future requests
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

        // update the current failed request
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        // release the waiting room and give them the new token
        processQueue(null, accessToken);

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem("accessToken");
        window.location.href = "/users/login"; // redirect to the login page
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false; // open the door
      }
    }

    return Promise.reject(error);
  }
);

export default api;
