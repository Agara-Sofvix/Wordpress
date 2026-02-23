import React from 'react';
import Hero from '../components/Hero';
import Challenges from '../components/Challenges';
import Services from '../components/Services';
import WhyChoose from '../components/WhyChoose';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import BlogSection from '../components/BlogSection';
import CTA from '../components/CTA';
import SEO from '../components/SEO';

const Home: React.FC = () => {
    return (
        <>
            <SEO pageSlug="home" />
            <Hero />
            <Challenges />
            <Services />
            <WhyChoose />
            <Process />
            <Testimonials />
            <BlogSection />
            <CTA />
        </>
    );
};

export default Home;
