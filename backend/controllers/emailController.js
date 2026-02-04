const asyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');
const fs = require('fs');
const EmailLog = require('../models/EmailLog'); // ✅ Import Model

// @desc    Send Invoice Email with PDF Attachment
// @route   POST /api/email/send-invoice
// @access  Private
const sendInvoiceEmail = asyncHandler(async (req, res) => {
  const { clientEmail, clientName, invoiceNumber, projectId } = req.body;
  const pdfFile = req.file; // File from Multer

  // 1. Validation Check
  if (!clientEmail || !pdfFile || !projectId) {
    res.status(400);
    throw new Error('Missing email, invoice file, or project ID');
  }

  // 2. Configure Transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // 3. Professional HTML Template
  const htmlTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #1d4ed8; padding: 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">GrowthServices Inc.</h1>
        <p style="color: #bfdbfe; margin: 5px 0 0; font-size: 14px;">Invoice #${invoiceNumber}</p>
      </div>
      <div style="padding: 30px; background-color: #ffffff; color: #334155;">
        <p style="font-size: 16px;">Dear <strong>${clientName}</strong>,</p>
        <p style="line-height: 1.6;">Thank you for your business. We have attached the invoice for your recent project below.</p>
        <div style="background-color: #f8fafc; border-left: 4px solid #1d4ed8; padding: 15px; margin: 25px 0;">
          <p style="margin: 5px 0;"><strong>Invoice:</strong> ${invoiceNumber}</p>
          <p style="margin: 5px 0;"><strong>Status:</strong> Ready for Payment</p>
        </div>
        <p>Best Regards,<br><strong>The GrowthServices Team</strong></p>
      </div>
      <div style="background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b;">
        <p>&copy; 2026 GrowthServices Inc.</p>
      </div>
    </div>
  `;

  // 4. Email Options
  const mailOptions = {
    from: `"Growth_v3 Accounts" <${process.env.EMAIL_USER}>`,
    to: clientEmail,
    subject: `Invoice #${invoiceNumber} from GrowthServices Inc.`,
    html: htmlTemplate, // ✅ Uses HTML
    attachments: [
      {
        filename: `Invoice_${invoiceNumber}.pdf`,
        content: fs.createReadStream(pdfFile.path)
      }
    ]
  };

  try {
    // 5. Send Email
    await transporter.sendMail(mailOptions);

    // 6. ✅ LOG SUCCESS TO DATABASE (Correct Placement)
    await EmailLog.create({
        clientName,
        clientEmail,
        invoiceNumber,
        projectId, // <--- SAVED HERE
        sentBy: req.user._id,
        status: 'Success'
    });

    // 7. Cleanup Temp File
    if(fs.existsSync(pdfFile.path)) {
        fs.unlinkSync(pdfFile.path);
    }

    res.status(200).json({ message: 'Email sent successfully!' });

  } catch (error) {
    // Log Failure (Optional, but good practice)
    console.error("Email Error:", error);
    res.status(500);
    throw new Error('Failed to send email');
  }
});

// @desc    Get all email logs
// @route   GET /api/email/logs
// @access  Private/Admin
const getEmailLogs = asyncHandler(async (req, res) => {
  const logs = await EmailLog.find().sort({ sentAt: -1 }).populate('sentBy', 'name');
  res.json(logs);
});

module.exports = { sendInvoiceEmail, getEmailLogs };