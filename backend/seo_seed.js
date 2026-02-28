const mongoose = require('mongoose');
const GlobalSEO = require('./models/GlobalSEO');
const PageSEO = require('./models/PageSEO');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const seedSEO = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for Comprehensive SEO seeding.');

        const coreKeywords = [
            'Web Development Company', 'Website Development Services', 'Software Development Company',
            'SaaS Development Company', 'Custom Software Development', 'Mobile App Development Company',
            'SEO Services Company', 'Digital Marketing Agency', 'Cloud Computing Services',
            'Server Setup Services', 'IT Solutions Company', 'Full Stack Development Company',
            'Business Website Development', 'E-commerce Website Development', 'Web Application Development'
        ].join(', ');

        const locationKeywords = [
            'Web Development Company in Chennai', 'Best IT Company in Chennai', 'SEO Company in Chennai',
            'Software Company in Chennai', 'SaaS Development Company in Chennai', 'Cloud Services in Chennai',
            'Server Installation Services in Chennai', 'Website Design Company in Chennai', 'Local SEO Services Chennai',
            'Startup IT Services Chennai', 'Web Development Company in Tharamani', 'IT Company in Tharamani',
            'Software Company in Tharamani', 'SEO Services in Tharamani', 'Server Setup in Tharamani',
            'SaaS Development in Tharamani', 'Website Developers in Tharamani', 'Tech Company near Tharamani IT Hub',
            'IT Services near Tharamani Chennai', 'Web Development Company in Velachery', 'IT Solutions in Velachery',
            'SEO Company in Velachery', 'Software Developers in Velachery', 'Cloud Setup Services in Velachery',
            'Startup Website Development Velachery', 'Server Maintenance Services Velachery'
        ].join(', ');

        const conversionKeywords = [
            'Affordable Web Development for Startups', 'Website Development for Small Business',
            'SaaS Product Development Company', 'Custom CRM Development', 'ERP Development Company',
            'Business Automation Software', 'Cloud Server Setup for SMEs', 'Dedicated Server Installation',
            'Website Maintenance Services', 'Website Redesign Company', 'Secure Business Website Development',
            'SEO Optimization for Business Websites', 'Lead Generation Website Development'
        ].join(', ');

        const techStackKeywords = [
            'React JS Development Company', 'Node JS Development Services', 'Laravel Development Company',
            'WordPress Development in Chennai', 'Shopify Website Development', 'AWS Cloud Setup Services',
            'Linux Server Installation Chennai', 'DigitalOcean Server Setup', 'VPS Hosting Setup Services',
            'API Development Company'
        ].join(', ');

        const brandKeywords = 'Agara Sofvix Web Development, Agara Sofvix IT Solutions Chennai, Agara Sofvix SaaS Development Company, Agara Sofvix SEO Services, Agara Sofvix Server Setup Chennai';

        const allGlobalKeywords = [coreKeywords, locationKeywords, conversionKeywords, techStackKeywords, brandKeywords].join(', ');

        // 1. Global SEO
        await GlobalSEO.findOneAndUpdate(
            {},
            {
                site_name: 'Agara-Sofvix',
                site_meta_title: 'Agara Sofvix | Web Development & SaaS Company Chennai, Velachery, Tharamani',
                site_meta_description: 'Agara Sofvix is a leading Web Development and SaaS Development Company in Chennai. We provide affordable SEO services, cloud server setup, and custom software for startups and SMEs in Velachery and Tharamani near Tharamani IT Hub.',
                site_keywords: allGlobalKeywords,
                og_image_url: '/assets/og-main.png',
                twitter_card_type: 'summary_large_image',
                robots_index: true,
                robots_follow: true,
                google_analytics_id: 'G-XXXXXXXXXX'
            },
            { upsert: true, returnDocument: 'after' }
        );

        // 2. Page Specific SEO
        const pages = [
            {
                page_slug: 'home',
                meta_title: 'Agara Sofvix | Best Web Development & IT Solutions in Velachery, Chennai',
                meta_description: 'Transform your business with Agara Sofvix. Top Software Developers in Velachery & Tharamani specializing in SaaS Product Development and Custom Software.',
                keywords: `Best web development company in Tharamani Chennai, ${locationKeywords}, Agara Sofvix IT Solutions Chennai`
            },
            {
                page_slug: 'services',
                meta_title: 'Our Services | SaaS, Web Development & SEO Services in Chennai',
                meta_description: 'Explore our services: Custom Website Development in Tharamani, SEO & Digital Marketing in Velachery, and Business Server Setup in Tharamani Chennai.',
                keywords: `${conversionKeywords}, ${techStackKeywords}, Service + Location combo, custom website development in tharamani`
            },
            {
                page_slug: 'industries',
                meta_title: 'Industries | Custom Software & Startup IT Solutions in Chennai',
                meta_description: 'We build end-to-end web and app development solutions for diverse industries. Helping startups and SMEs in Chennai grow with scalable technology.',
                keywords: 'Startup IT solutions in Chennai, Software company for SMEs in Chennai, industry specific software, local IT support velachery'
            },
            {
                page_slug: 'contact',
                meta_title: 'Contact Us | Web Development near Tharamani IT Hub, Tharamani, Chennai',
                meta_description: 'Get a free quote for Website Redesign or Cloud Server Setup for SMEs in Chennai. Visit our office in Velachery / Tharamani near Tharamani IT Hub.',
                keywords: 'Website development near Tharamani IT Hub, affordable SEO services for startups in Chennai, contact Agara Sofvix Chennai'
            }
        ];

        for (const page of pages) {
            await PageSEO.findOneAndUpdate(
                { page_slug: page.page_slug },
                page,
                { upsert: true, returnDocument: 'after' }
            );
        }

        console.log('Comprehensive SEO seeding completed.');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding SEO:', error);
        process.exit(1);
    }
};

seedSEO();
