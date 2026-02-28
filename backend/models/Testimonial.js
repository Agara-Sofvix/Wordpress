const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: String,
    company: String,
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 5
    },
    image: String,
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
