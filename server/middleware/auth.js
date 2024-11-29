import jwt from "jsonwebtoken";

const secret = 'secret';

const auth = async (req, res, next) => {
  try {
    console.log("Auth Middleware Invoked");

    // Retrieve the token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1];

    // Check if the token exists
    if (!token) {
      console.log("No token provided");
      return res.status(401).json({ message: 'Token is required for authentication' });
    }

    // Verify the token
    const decodedData = jwt.verify(token, secret);

    // Attach the decoded role to the request object for further processing
    req.role = decodedData?.role;

    console.log("Decoded token data:", decodedData);

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);

    // Return appropriate response for invalid or expired tokens
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default auth;
