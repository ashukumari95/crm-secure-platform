const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getMe, 
  updateUser, 
  createEmployee,
  getEmployees,       // <--- Import
  deleteUser,         // <--- Import
  resetUserPassword   // <--- Import
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');

// Public Routes
router.post('/', registerUser);
router.post('/login', loginUser);

// Protected Routes (All Users)
router.get('/me', protect, getMe);
router.put('/profile', protect, updateUser);

// Admin Routes (Protected)
router.post('/create', protect, createEmployee);
router.get('/employees', protect, getEmployees);        // List all
router.delete('/:id', protect, deleteUser);             // Delete one
router.put('/:id/reset', protect, resetUserPassword);   // Reset password

module.exports = router;