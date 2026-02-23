const mongoose = require('mongoose');
const User = require('./models/User');
const Service = require('./models/Service');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/agara-sofvix';

const defaultServices = [
    {
        title: "Web & App Development",
        category: "Development",
        description: "Professional web & app development tailored for your business success and growth.",
        icon: "language",
        features: [
            "Custom Responsive Web Applications",
            "Native & Cross-Platform Mobile Apps",
            "High-Conversion UI/UX Research & Design",
            "E-commerce & Dynamic Content Management",
            "API Integration & Performance Optimization"
        ],
        image: "/assets/services/saas_product_service_1771580811262.png",
        order: 1
    },
    {
        title: "SaaS Product Development",
        category: "SaaS",
        description: "Professional saas product development tailored for your business success and growth.",
        icon: "layers",
        features: [
            "Multi-tenant Architecture Scalability",
            "Subscription & Stripe Payment Systems",
            "Automated Workflow & Data Analytics",
            "Customer Success & Admin Portals",
            "Security Compliance & Data Redundancy"
        ],
        image: "/assets/services/saas_product_service_1771580811262.png",
        order: 2
    },
    {
        title: "SEO & Digital Growth",
        category: "Growth",
        description: "Professional seo & digital growth tailored for your business success and growth.",
        icon: "query_stats",
        features: [
            "Technical SEO Audits & Speed Fixes",
            "Content Strategy & Authority Building",
            "Conversion Rate Optimization (CRO)",
            "Advanced Keyword Competitive Research",
            "Lead Capture & Sales Funnel Engineering"
        ],
        image: "/assets/services/seo_growth_service_1771580833874.png",
        order: 3
    },
    {
        title: "Server & OS Installation",
        category: "Infrastructure",
        description: "Professional server & os installation tailored for your business success and growth.",
        icon: "terminal",
        features: [
            "Enterprise Linux/Windows Server Setup",
            "Network Security & Firewall Config",
            "Automated Backup & Disaster Recovery",
            "Cloud Migration & Hybrid Integration",
            "Proactive Health Monitoring Systems"
        ],
        image: "/assets/services/server_os_service_1771580856165.png",
        order: 4
    },
    {
        title: "IT Support & Maintenance",
        category: "Support",
        description: "Professional it support & maintenance tailored for your business success and growth.",
        icon: "engineering",
        features: [
            "24/7 Remote Desktop & Tech Support",
            "Zero-Downtime Security Patching",
            "Hardware Troubleshooting & Upgrades",
            "IT Policy & Compliance Management",
            "Staff Training & IT Strategy Roadmap"
        ],
        image: "/assets/services/it_support_service_1771580873150.png",
        order: 5
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        // 1. Seed Admin
        const existingAdmin = await User.findOne({ username: 'admin@agara.com' });
        if (existingAdmin) {
            console.log('Admin user already exists.');
        } else {
            const admin = new User({
                username: 'admin@agara.com',
                password: 'admin123'
            });
            await admin.save();
            console.log('Admin user created successfully!');
        }

        // 2. Seed Services
        for (const svc of defaultServices) {
            const existing = await Service.findOne({ title: svc.title });
            if (!existing) {
                await new Service(svc).save();
                console.log(`Service created: ${svc.title}`);
            } else {
                console.log(`Service already exists: ${svc.title}`);
            }
        }

        console.log('Seeding completed successfully!');
        mongoose.connection.close();
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedDatabase();
