const mongoose = require('mongoose');

const globalSEOSchema = new mongoose.Schema({
    site_meta_title: {
        type: String,
        default: 'Agara-Sofvix'
    },
    site_meta_description: String,
    site_keywords: String,
    og_image_url: String,
    twitter_card_type: {
        type: String,
        default: 'summary_large_image'
    },
    robots_index: {
        type: Boolean,
        default: true
    },
    robots_follow: {
        type: Boolean,
        default: true
    },
    google_analytics_id: String
}, {
    timestamps: true,
    collection: 'global_seo'
});

module.exports = mongoose.model('GlobalSEO', globalSEOSchema);
