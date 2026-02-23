const mongoose = require('mongoose');

const globalSEOSchema = new mongoose.Schema({
    site_meta_title: { type: String, default: 'Agara-Sofvix' },
    site_meta_description: { type: String, default: '' },
    site_keywords: { type: String, default: '' },
    og_image_url: { type: String, default: '' },
    twitter_card_type: { type: String, default: 'summary_large_image' },
    robots_index: { type: Boolean, default: true },
    robots_follow: { type: Boolean, default: true },
    google_analytics_id: { type: String, default: '' },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GlobalSEO', globalSEOSchema);
