const mongoose = require('mongoose');

const pageSEOSchema = new mongoose.Schema({
    page_slug: { type: String, required: true, unique: true },
    meta_title: { type: String, default: '' },
    meta_description: { type: String, default: '' },
    keywords: { type: String, default: '' },
    og_title: { type: String, default: '' },
    og_description: { type: String, default: '' },
    og_image_url: { type: String, default: '' },
    canonical_url: { type: String, default: '' },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PageSEO', pageSEOSchema);
