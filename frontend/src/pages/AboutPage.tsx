import React from 'react';
import About from '../components/About';
import CTA from '../components/CTA';
import SEO from '../components/SEO';

const AboutPage: React.FC = () => {
    return (
        <main className="bg-white">
            <SEO pageSlug="about" />
            <About />
            <CTA />
        </main>
    );
};

export default AboutPage;
