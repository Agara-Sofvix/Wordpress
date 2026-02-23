const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Admin Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET || 'secret_fallback',
            { expiresIn: '24h' }
        );

        res.status(200).json({
            token: token,
            expiresIn: 86400,
            userId: user._id,
            username: user.username
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error during login' });
    }
});

// Admin Registration (Should be protected or internal only in production)
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'Admin user created' });
    } catch (error) {
        res.status(500).json({ message: 'Server error during registration' });
    }
});

module.exports = router;
