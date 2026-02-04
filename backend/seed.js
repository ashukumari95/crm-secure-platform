console.log("1. Script started...");

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./models/User'); 
const Project = require('./models/Project');

console.log("2. Checking configuration...");

if (!process.env.MONGO_URI) {
  console.error("❌ FATAL ERROR: MONGO_URI is missing from .env file.");
  process.exit(1);
}

const seedData = async () => {
  try {
    console.log("3. Connecting to MongoDB Atlas...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to Database.');

    // 1. Clear old data
    console.log("4. Deleting old data...");
    await User.deleteMany({});
    await Project.deleteMany({});
    console.log('🗑️  Old data cleared.');

    // 2. Create Admin
    console.log("5. Creating Admin User...");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const adminUser = await User.create({
      name: 'Admin Rahul',
      email: 'admin@crm.com',
      password: hashedPassword,
      role: 'admin',
      jobTitle: 'System Administrator',
      department: 'IT'
    });
    console.log(`👑 Master Admin Created: ${adminUser.email}`);

    // 3. Create Sample Project
    console.log("6. Creating Sample Project...");
    await Project.create({
      name: 'Growth Services Website',
      description: 'Initial setup of the secure SaaS platform.',
      client: 'Internal',
      
      // --- FIX IS HERE ---
      status: 'Running', // Changed from 'active' to 'Running'
      priority: 'High',  // Changed from 'high' to 'High'
      // -------------------

      budget: 50000,
      deadline: new Date('2026-12-31'),
      techStack: 'MERN Stack',
      projectType: 'Web Development',
      createdBy: adminUser._id
    });
    console.log('🚀 Sample Project Created.');

    console.log('✅ SEED FINISHED. You may now login.');
    process.exit();

  } catch (error) {
    console.error('❌ Error Seeding Data:', error);
    process.exit(1);
  }
};

seedData();