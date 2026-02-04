const express = require('express');
const router = express.Router();
const multer = require('multer');

// 🟢 FIX: Import both functions here
const { sendInvoiceEmail, getEmailLogs } = require('../controllers/emailController');
const { protect } = require('../middleware/authMiddleware');

const upload = multer({ dest: 'uploads/' });

// Route to Send Invoice
router.post('/send-invoice', protect, upload.single('invoice'), sendInvoiceEmail);

// Route to Get Logs (The line that was crashing)
router.get('/logs', protect, getEmailLogs);

module.exports = router;