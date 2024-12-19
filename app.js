// Import necessary external packages
import bodyParser from "body-parser"; // Import body-parser to parse incoming request bodies
import cookieParser from "cookie-parser"; // Import cookie-parser to handle cookies in requests
import cors from "cors"; // Import CORS middleware to handle cross-origin requests
import dotenv from "dotenv"; // Import dotenv for managing environment variables
import express from "express"; // Import Express.js for building the web server
import mongoose from "mongoose"; // Import Mongoose for interacting with MongoDB
import router from "./src/routes/api.js"; // Import the router for API routes

// Express app initialization
const app = express(); // Create an Express application instance

// Dotenv configuration
dotenv.config(); // Load environment variables from a .env file

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) to allow requests from different origins
app.use(cookieParser()); // Middleware to parse cookies sent with incoming requests
app.use(bodyParser.json()); // Middleware to parse incoming JSON request bodies

// Database connection
mongoose
  .connect(process.env.DATABASE_CONNECTION_URL) // Connect to MongoDB using the connection URL from environment variables
  .then(() => console.log("Database connection successful")) // Log success if the connection is successful
  .catch((err) => console.log(err)); // Log error if the connection fails

// Routes
app.use("/api/v1", router); // Use the imported router for all routes starting with '/api/v1'

// Server start
const port = process.env.SERVER_RUNNING_PORT || 5000; // Set the server port from environment variables or default to 5000
app.listen(port, () => console.log(`Server is running on port ${port}`)); // Start the server and log the port it's running on
