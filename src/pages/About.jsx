import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/FooterRefined';
import AboutSection from '../components/AboutSection';
import MarqueeTicker from '../components/MarqueeTicker';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="bg-ovicare-dark min-h-screen">
            <div className="pt-40 pb-20 bg-white/5 border-b border-white/10">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight"
                    >
                        About <span className="text-ovicare-primary italic">Mayan Lifestyle</span>
                    </motion.h1>
                    <p className="text-xl text-ovicare-text/60 max-w-2xl">
                        Learn more about our mission, our values, and the dedicated team of professionals who make Mayan Lifestyle the leading medical provider.
                    </p>
                </div>
            </div>

            <AboutSection />

            <section className="py-24 container grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                {[
                    { title: "Our Mission", desc: "To provide world-class healthcare with compassion and excellence." },
                    { title: "Our Vision", desc: "To be the most trusted healthcare partner in the communities we serve." },
                    { title: "Our Values", desc: "Innovation, Integrity, Compassion, and Patient-Centered Excellence." },
                ].map((item, i) => (
                    <div key={i} className="p-10 bg-white/5 rounded-[40px] border border-white/10 hover:border-ovicare-primary/30 transition-all">
                        <h3 className="text-2xl font-bold text-white mb-4 italic text-ovicare-primary">{item.title}</h3>
                        <p className="text-ovicare-text/60 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </section>

            <MarqueeTicker />
            <Footer />
        </div>
    );
};

export default About;
