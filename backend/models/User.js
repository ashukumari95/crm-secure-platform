const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    // Security Field
    tokenVersion: {
      type: Number,
      default: 0,
    },
    // --- EMPLOYEE DETAILS ---
    phone: { 
      type: String, 
      default: '' 
    },
    jobTitle: { 
      type: String, 
      default: 'Staff' 
    },
    department: { 
      type: String, 
      default: 'General' 
    },
    role: { 
      type: String, 
      enum: ['admin', 'employee'], 
      default: 'employee' 
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);