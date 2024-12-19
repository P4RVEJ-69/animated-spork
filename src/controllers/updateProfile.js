// Importing the user registration model from the models directory
import userRegistrationModel from "../models/userRegistrationModel.js";

// Function to handle the profile update of a single user
const updateProfile = async (req, res) => {
  try {
    // Extract the request body (new data for the user profile)
    const reqBody = req.body;

    // Extract userId from request headers (assuming userId is passed in the headers for authentication)
    const { userId } = req.headers;

    // Update the user profile in the database using the updateOne method
    // - Searching for the user by their _id (userId)
    // - Using the $set operator to update the fields in the user document with the new data
    const updateUser = await userRegistrationModel.updateOne(
      { _id: userId }, // The condition to find the user by their userId
      { $set: { ...reqBody } } // Using the $set operator to update the document with new data (from reqBody)
    );

    // Return a success response with a message and the result of the update operation
    return res.json({
      success: true, // Indicating that the profile update was successful
      message: "Profile updated successfully", // Success message
    });
  } catch (error) {
    // If an error occurs during the update, catch the error and send a failure response

    // Return a failure response with a message indicating the profile update failed
    return res.json({
      success: false, // Indicating that the profile update failed
      message: "Profile update failed!", // Error message
    });
  }
};

// Exporting the function so it can be used in other parts of the application (such as routes)
export default updateProfile;
