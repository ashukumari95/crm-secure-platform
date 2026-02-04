// FILE: backend/server_safe.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// --- ROUTES ---
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const emailRoutes = require('./routes/emailRoutes'); // 📧 NEW IMPORT
// ✅ IMPORT SETTINGS CONTROLLER
const { getSettings, updateSettings } = require('./controllers/settingController'); 
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// 1. CORS
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"], 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 2. BODY PARSER
app.use(express.json({ limit: '10kb' })); 

// 3. ROUTES
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/email', emailRoutes); // 📧 NEW ROUTE MOUNT

// ✅ REAL SETTINGS ROUTES
app.get('/api/settings', getSettings);
app.put('/api/settings', updateSettings);

app.get('/', (req, res) => {
  res.send('Safe Mode API is running...');
});

// 4. ERROR HANDLER
app.use(errorHandler);

// 5. DB CONNECTION
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ SAFE MODE SERVER RUNNING - EMAIL SYSTEM ACTIVE'); 
    app.listen(process.env.PORT || 5000, () => console.log(`🚀 Port ${process.env.PORT || 5000}`));
  })
  .catch(err => console.error('❌ DB Error:', err));