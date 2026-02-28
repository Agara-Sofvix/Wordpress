const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'Core Service'
    },
    description: {
        type: String,
        required: true
    },
    icon: String,
    features: [String],
    image: String,
    stats_label: String,
    stats_value: String,
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);
