const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, default: 'Core Service' },
    description: { type: String, required: true },
    icon: { type: String }, // name of material icon
    features: [{ type: String }],
    image: { type: String },
    stats: {
        label: { type: String },
        value: { type: String }
    },
    order: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Service', serviceSchema);
