const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const Testimonial = require('../models/Testimonial');
const auth = require('../middleware/auth');

/**
 * PUBLIC ROUTES (Website)
 */

// GET all services
router.get('/services', async (req, res) => {
    try {
        const services = await Service.find().sort({ order: 1 });
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// GET all testimonials
router.get('/testimonials', async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ order: 1 });
        res.json(testimonials);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * PROTECTED ROUTES (Admin)
 */

// Services
router.post('/services', auth, async (req, res) => {
    try {
        const service = new Service(req.body);
        const newService = await service.save();
        res.status(201).json(newService);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch('/services/:id', auth, async (req, res) => {
    try {
        const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/services/:id', auth, async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.json({ message: 'Service deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Testimonials
router.post('/testimonials', auth, async (req, res) => {
    try {
        const testimonial = new Testimonial(req.body);
        const newTestimonial = await testimonial.save();
        res.status(201).json(newTestimonial);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch('/testimonials/:id', auth, async (req, res) => {
    try {
        const updated = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/testimonials/:id', auth, async (req, res) => {
    try {
        await Testimonial.findByIdAndDelete(req.params.id);
        res.json({ message: 'Testimonial deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
