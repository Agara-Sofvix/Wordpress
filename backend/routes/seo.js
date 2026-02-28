const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const GlobalSEO = require('../models/GlobalSEO');
const PageSEO = require('../models/PageSEO');

// GET Global SEO
router.get('/global', async (req, res) => {
    try {
        let globalSeo = await GlobalSEO.findOne();
        if (!globalSeo) {
            globalSeo = await GlobalSEO.create({});
        }
        res.status(200).json(globalSeo);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching global SEO' });
    }
});

// UPDATE Global SEO
router.put('/global', auth, async (req, res) => {
    try {
        const globalSeo = await GlobalSEO.findOneAndUpdate(
            {},
            { ...req.body },
            { new: true, upsert: true }
        );
        res.status(200).json(globalSeo);
    } catch (error) {
        res.status(500).json({ message: 'Error updating global SEO' });
    }
});

// GET all Page SEO
router.get('/pages', async (req, res) => {
    try {
        const pages = await PageSEO.find();
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching page SEO items' });
    }
});

// GET Page SEO by slug
router.get('/pages/:slug', async (req, res) => {
    try {
        const pageSeo = await PageSEO.findOne({ page_slug: req.params.slug });
        if (!pageSeo) {
            return res.status(404).json({ message: 'Page SEO not found' });
        }
        res.status(200).json(pageSeo);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching page SEO' });
    }
});

// UPDATE or CREATE Page SEO
router.put('/pages/:slug', auth, async (req, res) => {
    try {
        const pageSeo = await PageSEO.findOneAndUpdate(
            { page_slug: req.params.slug },
            { ...req.body, page_slug: req.params.slug },
            { new: true, upsert: true }
        );
        res.status(200).json(pageSeo);
    } catch (error) {
        res.status(500).json({ message: 'Error updating page SEO' });
    }
});

// GET Dynamic Sitemap
router.get('/sitemap.xml', async (req, res) => {
    try {
        const pages = ['home', 'about', 'services', 'industries', 'contact'];
        const domain = 'https://agara-sofvix.com';

        // You could also fetch dynamic items like services if they have their own pages
        // const services = await Service.find();

        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        pages.forEach(page => {
            const url = page === 'home' ? domain : `${domain}/${page}`;
            xml += `  <url>\n`;
            xml += `    <loc>${url}</loc>\n`;
            xml += `    <changefreq>weekly</changefreq>\n`;
            xml += `    <priority>${page === 'home' ? '1.0' : '0.8'}</priority>\n`;
            xml += `  </url>\n`;
        });

        xml += `</urlset>`;

        res.header('Content-Type', 'application/xml');
        res.send(xml);
    } catch (error) {
        res.status(500).send('Error generating sitemap');
    }
});

module.exports = router;
