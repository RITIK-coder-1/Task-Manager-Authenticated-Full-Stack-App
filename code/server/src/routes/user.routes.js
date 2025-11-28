// ----------------------------------------------
// user.routes.js
// This file contains all the routes for users
// ----------------------------------------------

import { Router } from "express"; // importing the router
import upload from "../middlewares/multer.middleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateAccount,
  updatePassword,
  updateFile,
  newAccessToken,
  getCurrentUser,
  deleteUser,
  deleteProfilePic,
} from "../controllers/user.controllers.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const userRouter = Router(); // express router

// ----------------------------------------------
// Defining specific routes
// - Register
// - Log in
// - Log Out
// - Delete the current user
// - Getting the current user
// - New Access Token
// - Update Details
// - Update Password
// - Update Profile
// - Delete Profile Pic
// ----------------------------------------------

userRouter.route("/register").post(upload.single("profilePic"), registerUser); // register the user on the register path

userRouter.route("/login").post(loginUser); // login the user on the login path

// SECURED ROUTES (User should be logged in to access these)

userRouter.route("/logout").post(verifyJWT, logoutUser); // log the user out on this path

userRouter.route("/delete").delete(verifyJWT, deleteUser); // delete the user

userRouter.route("/me").get(verifyJWT, getCurrentUser); // getting the current user (User profile)

userRouter.route("/me/token").post(verifyJWT, newAccessToken); // to issue a new access token end point

userRouter.route("/me/details").patch(verifyJWT, updateAccount); // to update the user details

userRouter.route("/me/password").patch(verifyJWT, updatePassword); // to update the password

userRouter
  .route("/me/appearance")
  .patch(verifyJWT, upload.single("profilePic"), updateFile) // to update the profile image
  .delete(verifyJWT, deleteProfilePic); // to delete the profile pic

export default userRouter; // exporting as default
