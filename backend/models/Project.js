const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a project name'],
    },
    client: { 
      type: String,
      required: [true, 'Please add a client name'],
    },
    // ✅ FIX: Added this field so the email is actually saved to the database
    clientEmail: {
      type: String,
      required: false, // Optional, but recommended
      default: ''
    },
    description: {
      type: String,
      required: false,
    },
    deadline: {
      type: Date,
      required: [true, 'Please add a deadline'],
    },
    budget: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Running', 'Completed', 'Active'], // Added 'Active' to match your frontend logic
      default: 'Pending',
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    // --- NEW PROFESSIONAL FIELDS ---
    priority: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      default: 'Medium'
    },
    techStack: {
      type: String,
      default: '' // e.g. "React, Node, Python"
    },
    projectType: {
      type: String,
      enum: ['Web Development', 'Mobile App', 'Security Audit', 'UI/UX Design', 'Other'],
      default: 'Web Development'
    },
    docsLink: {
      type: String, 
      default: '' // Link to Figma/GitHub/Drive
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);