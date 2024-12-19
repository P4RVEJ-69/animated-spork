// Import the user registration model to interact with the database
import userRegistrationModel from "../models/userRegistrationModel.js";

// Function to fetch a single user profile by user ID
const userProfile = async (req, res) => {
  // Destructure user ID from the request body (assuming it's validated by middleware)
  const { userId } = req.body;

  try {
    // Query the database to find the user by their ID
    const user = await userRegistrationModel.findById(userId);

    // Check if the user exists
    if (!user) {
      // If no user is found, return a 404 error response
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    // Respond with a success message and the user's data (without sensitive information)
    return res.status(200).json({ success: true, singleUser: user });
  } catch (error) {
    // If an error occurs (e.g., database query failure), log the error and return a 500 error response

    return res.status(500).json({ success: false, message: "User not found!" });
  }
};

// Export the function to be used in other parts of the application
export default userProfile;
