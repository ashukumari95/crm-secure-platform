const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @desc    Register new user (Public Registration)
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  // NOTE: You might want to change 'admin' to 'employee' if you want public signups to have restricted access by default.
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    tokenVersion: 0,
    role: 'admin', // Defaulting to Admin for your setup (change if needed)
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.tokenVersion),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    // Increment token version on login to invalidate old tokens if needed (Security best practice)
    user.tokenVersion = (user.tokenVersion || 0) + 1;
    await user.save();

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      jobTitle: user.jobTitle,
      token: generateToken(user._id, user.tokenVersion),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
      // Invalidate old tokens
      user.tokenVersion = (user.tokenVersion || 0) + 1;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      token: generateToken(updatedUser._id, updatedUser.tokenVersion),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Create a new employee (Admin only)
// @route   POST /api/users/create
// @access  Private/Admin
const createEmployee = asyncHandler(async (req, res) => {
  // 1. UPDATED: Destructure 'role' from the request body
  const { name, email, password, phone, jobTitle, department, role } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add name, email, and password');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 2. UPDATED: Create user using the role passed from frontend, or default to 'employee'
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    jobTitle,
    department,
    role: role || 'employee', // <--- This allows creating Admins
    tokenVersion: 0,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      jobTitle: user.jobTitle
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Get all employees (Admin only)
// @route   GET /api/users/employees
// @access  Private/Admin
const getEmployees = asyncHandler(async (req, res) => {
  // Return all users (both admins and employees) so you can manage the whole team
  // or filter by { role: 'employee' } if you only want staff.
  // Currently returning ALL so you can see other admins too.
  const users = await User.find({}).select('-password'); 
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Admin Force Reset Password
// @route   PUT /api/users/:id/reset
// @access  Private/Admin
const resetUserPassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    // Invalidate old sessions
    user.tokenVersion = (user.tokenVersion || 0) + 1;
    
    await user.save();
    res.json({ message: 'Password updated successfully' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Generate JWT
const generateToken = (id, tokenVersion) => {
  return jwt.sign({ id, tokenVersion }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateUser,
  createEmployee,
  getEmployees,
  deleteUser,
  resetUserPassword,
};