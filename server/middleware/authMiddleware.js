const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // 1. Get token from header
    const token = req.header('Authorization');

    // 2. Check if no token
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // 3. Verify token
    try {
        // Remove "Bearer " if it's there (sometimes frontend sends "Bearer <token>")
        const tokenString = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;
        
        const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
        
        // Attach user ID to the request object so routes can use it
        req.user = decoded; 
        next(); // Move to the next step (the actual route)
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};