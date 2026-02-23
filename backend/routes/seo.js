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
            // Create default if not exists
            globalSeo = new GlobalSEO();
            await globalSeo.save();
        }
        res.status(200).json(globalSeo);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching global SEO' });
    }
});

// UPDATE Global SEO
router.put('/global', auth, async (req, res) => {
    try {
        let globalSeo = await GlobalSEO.findOne();
        if (!globalSeo) {
            globalSeo = new GlobalSEO(req.body);
        } else {
            Object.assign(globalSeo, req.body);
            globalSeo.updated_at = Date.now();
        }
        await globalSeo.save();
        res.status(200).json(globalSeo);
    } catch (error) {
        res.status(500).json({ message: 'Error updating global SEO' });
    }
});

// GET all Page SEO items (useful for list if needed)
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

// UPDATE or CREATE Page SEO by slug
router.put('/pages/:slug', auth, async (req, res) => {
    try {
        const { slug } = req.params;
        let pageSeo = await PageSEO.findOne({ page_slug: slug });

        if (!pageSeo) {
            pageSeo = new PageSEO({ ...req.body, page_slug: slug });
        } else {
            Object.assign(pageSeo, req.body);
            pageSeo.updated_at = Date.now();
        }

        await pageSeo.save();
        res.status(200).json(pageSeo);
    } catch (error) {
        res.status(500).json({ message: 'Error updating page SEO' });
    }
});

module.exports = router;
