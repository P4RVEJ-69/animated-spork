// Import necessary external packages
import bcrypt from "bcrypt"; // For hashing passwords securely
import jwt from "jsonwebtoken"; // For creating JSON Web Tokens (JWT)

// Import the user registration model
import userRegistrationModel from "../models/userRegistrationModel.js";

// Registration function that handles user registration
const registration = async (req, res) => {
  // Destructure required fields from the request body
  const { firstName, lastName, NIDNumber, phoneNumber, password, bloodGroup } =
    req.body;

  // Validate that all required fields are provided
  if (!firstName) {
    return res.json({
      success: false,
      message: "First name is required", // If first name is missing, return an error response
    });
  }

  if (!lastName) {
    return res.json({
      message: "Last name is required", // If last name is missing, return an error response
    });
  }

  if (!NIDNumber) {
    return res.json({
      success: false,
      message: "NIDNumber name is required", // If NID number is missing, return an error response
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

  if (!bloodGroup) {
    return res.json({
      success: false,
      message: "Blood group is required", // If blood group is missing, return an error response
    });
  }

  try {
    // Check if a user already exists with the same NID number
    const existingUser = await userRegistrationModel.findOne({
      NIDNumber,
    });

    if (existingUser) {
      // If a user with the same NID exists, return an error response
      return res.json({
        success: false,
        message: "User already exists", // User already registered with the same NID
      });
    }

    // Hash the password using bcrypt for secure storage
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const user = await userRegistrationModel({
      firstName,
      lastName,
      NIDNumber,
      phoneNumber,
      password: hashedPassword,
      bloodGroup,
    });

    // Save the user in the database
    await user.save();

    // Generate a JWT token for the new user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h", // Set token expiration time to 24 hours
    });

    // Set the JWT token in an HTTP-only cookie for client-side security
    res.cookie("token", token, {
      httpOnly: true, // Prevent client-side access to the cookie
      // secure: true, // Use HTTPS for secure cookie transmission
      maxAge: 24 * 60 * 60 * 1000, // Set the cookie expiration time to 24 hours
    });

    // Send a successful response with the token
    return res.json({
      success: true,
      message: "Registration successful", // Successful registration message
    });
  } catch (error) {
    // Handle any errors that occur during the try block
    console.error(error);
    res.json({
      success: false,
      message: "Registration failed!", // Return a generic error message
    });
  }

  // Send a generic response in case of failure or other cases (though this is unreachable)
  res.send("Registration");
};

// Export the registration function to be used in other parts of the application
export default registration;
