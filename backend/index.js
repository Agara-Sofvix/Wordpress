const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin');
const contentRoutes = require('./routes/content');
const seoRoutes = require('./routes/seo');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);

        const allowedOrigins = [
            process.env.FRONTEND_URL,
            process.env.ADMIN_URL,
            'https://agara-sofvix.com',
            'https://admin.agara-sofvix.com',
            'https://www.agara-sofvix.com',
            'http://agara-sofvix.com',
            'http://admin.agara-sofvix.com',
            'http://www.agara-sofvix.com'
        ].filter(Boolean).map(o => o.replace(/\/$/, ''));

        const cleanOrigin = origin.replace(/\/$/, '');

        const isLocal = cleanOrigin.startsWith('http://localhost') ||
            cleanOrigin.startsWith('http://127.0.0.1') ||
            cleanOrigin.startsWith('http://192.168.') ||
            cleanOrigin.startsWith('http://10.') ||
            cleanOrigin.startsWith('http://172.');

        if (allowedOrigins.includes(cleanOrigin) || isLocal) {
            callback(null, true);
        } else {
            console.log(`[CORS] Origin rejected: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
}));

// Better CORS error handling middleware
app.use((err, req, res, next) => {
    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({
            message: 'Access Denied: CORS Policy Violation',
            error: err.message
        });
    }
    next(err);
});

app.use(express.json());

// Request Logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/seo', seoRoutes);

// Database Connection
const { connectDB } = require('./config/db');

connectDB()
    .then(() => {
        app.listen(5001, "0.0.0.0", () => {
            console.log("Server running on port 5001");
        });
    })
    .catch(err => {
        console.error('Failed to start server:', err);
    });

// Health Check
app.get('/health', (req, res) => {
    console.log(`[Health] Root check from ${req.ip}`);
    res.status(200).json({ status: 'UP', timestamp: new Date() });
});

// Production Health Check for Gateway
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK' });
});
