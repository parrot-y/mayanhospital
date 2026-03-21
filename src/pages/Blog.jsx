import React from 'react';
import Footer from '../components/FooterRefined';
import { motion } from 'framer-motion';

const Blog = () => {
    return (
        <div className="bg-ovicare-dark min-h-screen">
            <div className="pt-40 pb-20 bg-white/5 border-b border-white/10">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight"
                    >
                        Latest <span className="text-ovicare-primary italic">News</span>
                    </motion.h1>
                    <p className="text-xl text-ovicare-text/60 max-w-2xl">
                        Stay updated with the latest medical breakthroughs, health tips, and news from Mayan Lifestyle.
                    </p>
                </div>
            </div>

            <section className="py-24 container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="bg-white/5 border border-white/10 rounded-[30px] overflow-hidden hover:border-ovicare-primary/30 transition-all group">
                            <div className="aspect-video bg-white/10 group-hover:bg-ovicare-primary/10 transition-colors" />
                            <div className="p-8">
                                <span className="text-ovicare-primary text-xs font-bold uppercase tracking-widest">Medical • March 18, 2026</span>
                                <h3 className="text-xl font-bold text-white mt-4 mb-4 group-hover:text-ovicare-primary transition-colors leading-tight">Innovative Heart Surgery Techniques at Mayan Lifestyle</h3>
                                <p className="text-ovicare-text/40 text-sm mb-6 line-clamp-2">Learn about how we are using robotic assistance to improve outcomes in complex cardiac procedures...</p>
                                <button className="text-white font-bold text-sm border-b border-white/10 pb-1 hover:text-ovicare-primary hover:border-ovicare-primary transition-all">Read More →</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Blog;
