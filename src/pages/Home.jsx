import React from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ServiceCarousel from '../components/ServiceCarousel';
import MarqueeTicker from '../components/MarqueeTicker';
import ProcessSection from '../components/ProcessSection';
import CTASection from '../components/CTASection';
import TeamSlider from '../components/TeamSlider';
import TestimonialSection from '../components/TestimonialSection';

const Home = () => {
    return (
        <div className="bg-ovicare-dark">
            <Hero />
            <AboutSection />
            <ServiceCarousel />
            <MarqueeTicker />
            <ProcessSection />
            <CTASection />
            <TeamSlider />
            <TestimonialSection />
            <MarqueeTicker reverse />
        </div>
    );
};

export default Home;
