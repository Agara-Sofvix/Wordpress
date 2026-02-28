const mongoose = require('mongoose');

const pageSEOSchema = new mongoose.Schema({
    page_slug: {
        type: String,
        required: true,
        unique: true
    },
    meta_title: String,
    meta_description: String,
    keywords: String,
    og_title: String,
    og_description: String,
    og_image_url: String,
    canonical_url: String
}, {
    timestamps: true,
    collection: 'page_seo'
});

module.exports = mongoose.model('PageSEO', pageSEOSchema);
