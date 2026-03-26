import React from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ServiceCarousel from '../components/ServiceCarousel';
import MarqueeTicker from '../components/MarqueeTicker';
import ProcessSection from '../components/ProcessSection';
import CTASection from '../components/CTASection';
import TestimonialSection from '../components/TestimonialSection';
import TeamGallery from '../components/TeamGallery';

const Home = () => {
    return (
        <div className="bg-ovicare-dark">
            <Hero />
            <AboutSection />
            <ServiceCarousel />
            <MarqueeTicker />
            <ProcessSection />
            <TeamGallery />
            <CTASection />
            <TestimonialSection />
            <MarqueeTicker reverse />
        </div>
    );
};

export default Home;
