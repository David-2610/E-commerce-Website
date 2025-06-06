const jwt = require('jsonwebtoken');
const User = require('../Models/User'); // Import the User model




// Middleware to authenticate user based on JWT token
const protect = async (req,resizeBy,next) => {
    let token;
    // Check if the token is present in the Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract the token from the header
            token = req.headers.authorization.split(' ')[1];
            // Verify the token using JWT secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Find the user based on the decoded token ID
            req.user = await User.findById(decoded.user.id).select('-password');
            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };