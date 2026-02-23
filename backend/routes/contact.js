const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');

// Submit Contact Form
router.post('/', async (req, res) => {
    try {
        const { name, email, company, phone, service, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Name, email, and message are required' });
        }

        const submission = new Submission({
            name, email, company, phone, service, message
        });

        await submission.save();
        res.status(201).json({ success: true, message: 'Submission received' });
    } catch (error) {
        console.error('Contact submission error:', error);
        res.status(500).json({ message: 'Server error during form submission' });
    }
});

module.exports = router;
