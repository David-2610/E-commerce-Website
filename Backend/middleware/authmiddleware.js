// this file will contain the middleware to protect the routes
const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.user.id).select("-password");
      next();
    } catch (error) {
      console.error("Token verification failed:", error);

      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expireded" });
      }

      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    console.error("Authorization error: No token provided");
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};


// middleware to protect the routes
// this middleware will be used to protect the routes in the userRoutes.js file
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    // If User is an admin, proceed to the next middleware or route handler
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};

// OPTIONAL middleware that doesn't block unauthenticated users
const optionalAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.user.id).select("-password");
    } catch (error) {
      console.error("Optional auth: Invalid token, proceeding as guest.");
      req.user = null;
    }
  } else {
    req.user = null;
  }

  next();
};

module.exports = { protect, admin, optionalAuth };
// this will be used to protect the routes in the userRoutes.js file
// i.e. in the backend/routes/userRoutes.js file
