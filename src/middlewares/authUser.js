// Importing the jwt library for token generation and verification
import jwt from "jsonwebtoken"; // JWT token generation

// Middleware function to handle user authentication
const userAuth = (req, res, next) => {
  // Extract token from cookies (assuming token is stored in the cookies)
  const { token } = req.cookies;

  // Check if the token is present in the cookies
  if (!token) {
    // If no token is found, return a 401 Unauthorized response
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized user not found!" });
  }

  try {
    // Verify the JWT token using the secret key stored in the environment variables
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Check if the decoded token contains a userId (which indicates the user's identity)
    if (decodedToken.userId) {
      // Attach the userId to the request body and headers for further use in route handlers
      req.body.userId = decodedToken.userId; // Attach userId to request body
      req.headers.userId = decodedToken.userId; // Attach userId to request headers
    } else {
      // If the userId is not found in the token, return a 401 Unauthorized response
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user not found!" });
    }

    // Proceed to the next middleware or route handler (Authorized access)
    next();
  } catch (error) {
    // Catch any errors related to the token verification process (e.g., invalid token)
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized user not found!" });
  }
};

// Export the userAuth middleware to be used in other parts of the application (e.g., route definitions)
export default userAuth;
