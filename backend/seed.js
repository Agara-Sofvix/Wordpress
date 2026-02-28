const mongoose = require('mongoose');
const User = require('./models/User');
const Service = require('./models/Service');
const Testimonial = require('./models/Testimonial');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for Expanded SEO Seeding.');

        // 1. Seed Admin
        const existingUser = await User.findOne({ username: 'admin' });
        if (!existingUser) {
            const admin = new User({ username: 'admin', password: 'password123' });
            await admin.save();
        }

        console.log('Database keyword seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();
