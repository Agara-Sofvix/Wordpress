const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Admin Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(`[Auth] Login attempt for: ${username}`);
        const user = await User.findOne({ username });

        if (!user) {
            console.log(`[Auth] User not found: ${username}`);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log(`[Auth] User found, comparing password...`);
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            console.log(`[Auth] Password mismatch for: ${username}`);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log(`[Auth] Password match! Generating token...`);

        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET || 'agara_admin_secret_key_2026_prod',
            { expiresIn: '24h' }
        );

        console.log(`[Auth] Login successful for: ${username}`);
        res.status(200).json({
            token: token,
            expiresIn: 86400,
            userId: user._id,
            username: user.username
        });
    } catch (error) {
        console.error(`[Auth] Login error: ${error.message}`);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// Admin Registration
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
