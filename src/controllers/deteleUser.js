// Importing the user registration model from the models directory
import userRegistrationModel from "../models/userRegistrationModel.js";

// Function to handle the deletion of a single user
const deleteUser = async (req, res) => {
  try {
    // Extract the userId from the request body (assuming it's passed in the body for deletion)
    const { userId } = req.body;

    // Deleting the user from the database using the deleteOne method
    // - Searching for the user by their _id (userId)
    // - The user document will be deleted from the database
    await userRegistrationModel.deleteOne({ _id: userId });

    // Clear the JWT token from the client-side cookie
    res.clearCookie("token", {
      httpOnly: true, // Only accessible via HTTP, not JavaScript
      secure: true, // Use HTTPS in production
    });

    // Return a success response if the deletion was successful
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    // Catch any errors during the deletion process and return a failure response
    return res.json({ success: false, message: "User deletion failed!" });
  }
};

// Exporting the function so it can be used in other parts of the application (e.g., route handlers)
export default deleteUser;
