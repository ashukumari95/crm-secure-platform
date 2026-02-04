require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const fixAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to Database.");

    // 1. Find the user
    const user = await User.findOne({ email: 'admin@crm.com' });

    if (!user) {
      console.log("❌ Admin User NOT FOUND!");
      process.exit();
    }

    console.log(`🧐 Current Status: Role = "${user.role}"`);

    // 2. Force Update to lowercase 'admin'
    user.role = 'admin'; 
    await user.save();

    console.log("✅ FIXED: Role forced to 'admin' (lowercase).");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

fixAdmin();