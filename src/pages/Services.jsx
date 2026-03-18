import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/FooterRefined';
import ServicesSection from '../components/ServicesSection';
import MarqueeTicker from '../components/MarqueeTicker';
import { motion } from 'framer-motion';

const Services = () => {
    return (
        <div className="bg-ovicare-dark min-h-screen">
            <div className="pt-40 pb-20 bg-white/5 border-b border-white/10">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight"
                    >
                        Our <span className="text-ovicare-primary italic">Services</span>
                    </motion.h1>
                    <p className="text-xl text-ovicare-text/60 max-w-2xl">
                        Comprehensive medical care across multiple specialties using the latest diagnostic and surgical technologies.
                    </p>
                </div>
            </div>

            <ServicesSection />

            <MarqueeTicker />
            <Footer />
        </div>
    );
};

export default Services;
