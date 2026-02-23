const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String },
    company: { type: String },
    content: { type: String, required: true },
    rating: { type: Number, default: 5 },
    image: { type: String },
    order: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
