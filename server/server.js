require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Init
const app = express();
connectDB();
app.use(express.json());
app.use(cors({ origin: 'https://campusecho-frontend.onrender.com' }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/news', require('./routes/newsRoutes'));
app.use('/api/referral-requests', require('./routes/referralRequestRoutes'));


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
