// roleMiddleware.js placeholder
// Accepts an array of allowed roles (e.g., ['admin', 'manager'])
const roleCheck = (roles) => {
  return (req, res, next) => {
    // req.user is set by the authMiddleware (protect)
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Access denied. You are a ${req.user ? req.user.role : 'guest'}, but this requires: ${roles.join(' or ')}` 
      });
    }
    next();
  };
};

module.exports = { roleCheck };