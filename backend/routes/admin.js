const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');
const auth = require('../middleware/auth');

// Get all submissions (Protected)
router.get('/submissions', auth, async (req, res) => {
    try {
        const submissions = await Submission.find().sort({ createdAt: -1 });
        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching submissions' });
    }
});

// Update submission status (Protected)
router.patch('/submissions/:id', auth, async (req, res) => {
    try {
        const { status } = req.body;
        const submission = await Submission.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!submission) return res.status(404).json({ message: 'Submission not found' });
        res.status(200).json(submission);
    } catch (error) {
        res.status(500).json({ message: 'Error updating submission' });
    }
});

// Delete submission (Protected)
router.delete('/submissions/:id', auth, async (req, res) => {
    try {
        await Submission.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Submission deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting submission' });
    }
});

// Get Stats (Protected)
router.get('/stats', auth, async (req, res) => {
    try {
        const { range = '7d' } = req.query;

        const totalSubmissions = await Submission.countDocuments();
        const newSubmissions = await Submission.countDocuments({ status: 'new' });

        // Calculate Date Range
        const startDate = new Date();
        if (range === '24h') {
            startDate.setHours(startDate.getHours() - 24);
        } else if (range === '30d') {
            startDate.setDate(startDate.getDate() - 30);
        } else if (range === '90d') {
            startDate.setDate(startDate.getDate() - 90);
        } else {
            startDate.setDate(startDate.getDate() - 7);
        }

        // Lead Trends Aggregation
        const format = range === '24h' ? '%H:00' : '%Y-%m-%d';
        const trends = await Submission.aggregate([
            { $match: { createdAt: { $gte: startDate } } },
            {
                $group: {
                    _id: { $dateToString: { format: format, date: '$createdAt' } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Service Distribution Aggregation
        const distribution = await Submission.aggregate([
            { $match: { createdAt: { $gte: startDate } } },
            {
                $group: {
                    _id: '$service',
                    count: { $sum: 1 }
                }
            }
        ]);

        const stats = {
            totalVisits: 12842,
            conversionRate: ((totalSubmissions / 12842) * 100).toFixed(1) + '%',
            formSubmissions: totalSubmissions,
            newSubmissionsCount: newSubmissions,
            systemHealth: '100%',
            trafficFlow: [40, 65, 45, 90, 55, 75, 85],
            leadTrends: trends.map(t => ({ name: t._id, leads: t.count })),
            serviceDistribution: distribution.map(d => ({ name: d._id || 'General', value: d.count }))
        };

        res.status(200).json(stats);
    } catch (error) {
        console.error('Stats fetch error:', error);
        res.status(500).json({ message: 'Error fetching stats' });
    }
});

module.exports = router;
