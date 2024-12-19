// Import the user registration model to interact with the database
import userRegistrationModel from "../models/userRegistrationModel.js";

// Function to fetch all user profiles from the database
const getAllUserProfile = async (req, res) => {
  try {
    // Query the database to get all user records
    const user = await userRegistrationModel.find({});

    // Return a successful response with the retrieved user data
    return res.json({ success: true, allUser: user });
  } catch (error) {
    // If an error occurs during the database query, return an error response
    return res.json({ success: false, message: "All users not found!" });
  }
};

// Export the function to be used in other parts of the application
export default getAllUserProfile;
