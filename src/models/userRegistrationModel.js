// Importing the mongoose package to interact with MongoDB
import mongoose from "mongoose";

// Define a schema for the user registration model
const userRegistrationSchema = mongoose.Schema({
  // firstName field - required string
  firstName: {
    type: String, // Specifies the data type as String
    required: true, // Ensures the field is mandatory
  },

  // lastName field - required string
  lastName: {
    type: String, // Specifies the data type as String
    required: true, // Ensures the field is mandatory
  },

  // NIDNumber field - required string (likely refers to National ID Number)
  NIDNumber: {
    type: String, // Specifies the data type as String
    required: true, // Ensures the field is mandatory
  },

  // phoneNumber field - required string
  phoneNumber: {
    type: String, // Specifies the data type as String
    required: true, // Ensures the field is mandatory
  },

  // password field - required string (used for user authentication)
  password: {
    type: String, // Specifies the data type as String
    required: true, // Ensures the field is mandatory
  },

  // bloodGroup field - required string (optional but typically used for health-related applications)
  bloodGroup: {
    type: String, // Specifies the data type as String
    required: true, // Ensures the field is mandatory
  },
});

// Create a model using the user registration schema
// The model name is "user" and it will be used for CRUD operations on the "users" collection in MongoDB
const userRegistrationModel = mongoose.model("user", userRegistrationSchema);

// Export the model so it can be used in other parts of the application (like controllers)
export default userRegistrationModel;
