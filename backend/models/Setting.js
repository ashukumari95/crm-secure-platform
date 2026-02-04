const mongoose = require('mongoose');

const settingSchema = mongoose.Schema(
  {
    companyName: { type: String, default: 'GrowthServices Inc.' },
    contactEmail: { type: String, default: 'finance@growth.com' },
    whatsappNumber: { type: String, default: '+91 98765 43210' },
    address: { type: String, default: '123 Innovation Park, Sector 62, Noida' },
    gstin: { type: String, default: '09AAACG1234A1Z5' },
    website: { type: String, default: 'www.growthservices.com' },
    
    // Social Media (Optional)
    facebookUrl: { type: String, default: '' },
    instagramUrl: { type: String, default: '' },
    twitterUrl: { type: String, default: '' },
    
    // Singleton Enforcer
    isDefault: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Setting', settingSchema);