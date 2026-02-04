const express = require('express');
const router = express.Router();
const Setting = require('../models/Setting'); // Importing your model
const { protect } = require('../middleware/authMiddleware');

// @desc    Get Global Settings (Public or Private)
// @route   GET /api/settings
router.get('/', async (req, res) => {
  try {
    // Always get the first settings document (since there is only one global config)
    let settings = await Setting.findOne();
    
    // If it doesn't exist yet (first time running), create it
    if (!settings) {
      settings = await Setting.create({});
    }
    
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Server Error loading settings' });
  }
});

// @desc    Update Settings
// @route   PUT /api/settings
// @access  Private (Admins only)
router.put('/', protect, async (req, res) => {
  try {
    const settings = await Setting.findOne();

    if (settings) {
      settings.whatsappNumber = req.body.whatsappNumber || settings.whatsappNumber;
      settings.facebookUrl = req.body.facebookUrl || settings.facebookUrl;
      settings.instagramUrl = req.body.instagramUrl || settings.instagramUrl;
      settings.twitterUrl = req.body.twitterUrl || settings.twitterUrl;
      settings.companyName = req.body.companyName || settings.companyName;
      
      const updatedSettings = await settings.save();
      res.json(updatedSettings);
    } else {
      res.status(404).json({ message: 'Settings not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error updating settings' });
  }
});

module.exports = router;