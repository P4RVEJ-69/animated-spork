// Import necessary external packages
import bcrypt from "bcrypt"; // For securely hashing passwords
import jwt from "jsonwebtoken"; // For creating JSON Web Tokens (JWT)

// Import the user registration model to interact with the database
import userRegistrationModel from "../models/userRegistrationModel.js";

// Login function to handle user login
const login = async (req, res) => {
  // Destructure required fields from the request body
  const { NIDNumber, phoneNumber, password } = req.body;

  // Validate that all required fields are provided
  if (!NIDNumber) {
    return res.json({
      success: false,
      message: "NID number is required", // If NID number is missing, return an error response
    });
  }

  if (!phoneNumber) {
    return res.json({
      success: false,
      message: "Phone number is required", // If phone number is missing, return an error response
    });
  }

  if (!password) {
    return res.json({
      success: false,
      message: "Password is required", // If password is missing, return an error response
    });
  }

  try {
    // Find the user in the database using the provided NID number
    const user = await userRegistrationModel.findOne({
      NIDNumber,
    });

    // If the user is not found, return an error response
    if (!user) {
      return res.json({
        success: false,
        message: "User not found!", // If no user matches the NID number, return this message
      });
    }

    // Compare the provided password with the stored hashed password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the password is incorrect, return an error response
    if (!isPasswordValid) {
      return res.json({
        success: false,
        message: "Password is incorrect!", // If the password doesn't match, return this message
      });
    }

    // Generate a JWT token for the logged-in user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h", // Set token expiration time to 24 hours
    });

    // Set the JWT token in an HTTP-only cookie for client-side security
    res.cookie("token", token, {
      httpOnly: true, // Ensure the token is not accessible via client-side JavaScript
      secure: true, // Use HTTPS for secure transmission of the cookie
      maxAge: 24 * 60 * 60 * 1000, // Set the cookie expiration time to 24 hours
    });

    // Send a successful response with the JWT token
    return res.json({
      success: true,
      message: "Login successful", // Successful login message
    });
  } catch (error) {
    // Catch any errors that occur during the process and return a failure response
    return res.json({
      success: false,
      message: "Login failed!", // If an error occurs, return a generic login failure message
    });
  }
};

// Export the login function to be used in other parts of the application
export default login;
