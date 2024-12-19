// Importing the express package to create the router
import express from "express";

// Importing the controllers for various routes
import deleteUser from "../controllers/deteleUser.js"; // Controller to delete a single user
import getAllUserProfile from "../controllers/getAllUserProfile.js"; // Controller to retrieve all user profiles
import login from "../controllers/login.js"; // Controller for login functionality
import registration from "../controllers/registration.js"; // Controller for user registration
import updateProfile from "../controllers/updateProfile.js"; // Controller for updating a single user's profile
import userProfile from "../controllers/userProfile.js"; // Controller to retrieve single user profile
import userAuth from "../middlewares/authUser.js"; // Middleware to authenticate user via JWT

// Initializing the Express router
const router = express.Router();

// Defining the routes for different functionalities

// Route for user registration (POST request to /registration)
// Calls the registration controller to handle user registration logic
router.post("/registration", registration);

// Route for user login (POST request to /login)
// Calls the login controller to handle user login logic
router.post("/login", login);

// Route to fetch the profile of a single user (GET request to /single-user-profile)
// Uses userAuth middleware to ensure the user is authenticated
// If authenticated, calls the singleUserProfile controller to retrieve the user's profile
router.get("/user-profile", userAuth, userProfile);

// Route to fetch all user profiles (GET request to /get-all-user-profile)
// Calls the getAllUserProfile controller to retrieve all user profiles
router.get("/all-user-profile", getAllUserProfile);

// Route to update the profile of a single user (POST request to /single-profile-update)
// Uses userAuth middleware to ensure the user is authenticated before allowing profile update
// Calls the singleUserProfileUpdate controller to handle profile update logic
router.post("/update-profile", userAuth, updateProfile);

// Route to delete a single user (POST request to /delete-user)
// Uses userAuth middleware to authenticate the user before deleting their account
// Calls the deleteSingleUser controller to handle the user deletion
router.post("/delete-user", userAuth, deleteUser);

// Exporting the router to be used in other parts of the application (e.g., server.js or app.js)
export default router;
