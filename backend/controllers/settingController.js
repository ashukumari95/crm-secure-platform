const asyncHandler = require('express-async-handler');
const Setting = require('../models/Setting');

// @desc    Get Global Settings
// @route   GET /api/settings
// @access  Private
const getSettings = asyncHandler(async (req, res) => {
  let settings = await Setting.findOne({ isDefault: true });

  if (!settings) {
    settings = await Setting.create({
      companyName: 'GrowthServices Inc.',
      isDefault: true
    });
  }
  res.status(200).json(settings);
});

// @desc    Update Settings
// @route   PUT /api/settings
// @access  Private (Admin Only)
const updateSettings = asyncHandler(async (req, res) => {
  // 🔒 SECURITY: Admin Check
  if (req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Access Denied: Only Admins can modify global settings');
  }

  const settings = await Setting.findOne({ isDefault: true });

  if (!settings) {
    res.status(404);
    throw new Error('Settings not found');
  }

  // 🔒 SECURITY: Whitelist allowed fields (Prevent Mass Assignment)
  // We explicitly extract strictly what is allowed to be changed.
  const { 
      companyName, contactEmail, whatsappNumber, 
      address, gstin, website, 
      facebookUrl, instagramUrl, twitterUrl 
  } = req.body;

  settings.companyName = companyName || settings.companyName;
  settings.contactEmail = contactEmail || settings.contactEmail;
  settings.whatsappNumber = whatsappNumber || settings.whatsappNumber;
  settings.address = address || settings.address;
  settings.gstin = gstin || settings.gstin;
  settings.website = website || settings.website;
  
  // Socials (Optional)
  if(facebookUrl !== undefined) settings.facebookUrl = facebookUrl;
  if(instagramUrl !== undefined) settings.instagramUrl = instagramUrl;
  if(twitterUrl !== undefined) settings.twitterUrl = twitterUrl;

  const updatedSettings = await settings.save();
  res.status(200).json(updatedSettings);
});

module.exports = { getSettings, updateSettings };