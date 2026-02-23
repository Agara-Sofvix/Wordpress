const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String },
    phone: { type: String },
    service: { type: String },
    message: { type: String, required: true },
    status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Submission', submissionSchema);
