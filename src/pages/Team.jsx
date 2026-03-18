import React from 'react';
import Footer from '../components/FooterRefined';
import TeamSlider from '../components/TeamSlider';
import { motion } from 'framer-motion';

const Team = () => {
    return (
        <div className="bg-ovicare-dark min-h-screen">
            <div className="pt-40 pb-20 bg-white/5 border-b border-white/10">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight"
                    >
                        Our <span className="text-ovicare-primary italic">Specialists</span>
                    </motion.h1>
                    <p className="text-xl text-ovicare-text/60 max-w-2xl">
                        Meet our world-class team of doctors, surgeons, and medical professionals dedicated to your well-being.
                    </p>
                </div>
            </div>

            <TeamSlider />

            <Footer />
        </div>
    );
};

export default Team;
