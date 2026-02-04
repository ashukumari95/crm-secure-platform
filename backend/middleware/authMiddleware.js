const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the database
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        res.status(401);
        throw new Error('User not found');
      }

      // --- NEW CHECK: Single Session Enforcement ---
      // If the token version in the packet doesn't match the DB, it's an old session.
      if (decoded.tokenVersion !== user.tokenVersion) {
        res.status(401);
        throw new Error('Session expired. You logged in on another device.');
      }

      req.user = user;
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error(error.message || 'Not authorized');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports = { protect };