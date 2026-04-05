import React from 'react';
import { motion } from 'framer-motion';

const images = [
    '/assets/images/team_a.webp',
    '/assets/images/team_b.webp',
    '/assets/images/team_c.webp',
    '/assets/images/team_d.webp',
    '/assets/images/team_e.webp',
];

const TeamGallery = () => {
    return (
        <section className="py-20 md:py-28 bg-ovicare-dark">
            <div className="container">
                <div className="text-center mb-14">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-ovicare-primary text-sm font-semibold uppercase tracking-widest mb-3"
                    >
                        Our People
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold text-white"
                    >
                        Meet Our Team
                    </motion.h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((src, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            className="overflow-hidden rounded-2xl aspect-[4/5] group"
                        >
                            <img
                                src={src}
                                alt="Mayan Lifestyle Hospital Team"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </motion.div>
                    ))}
                </div>
                {/* View Full Gallery CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex justify-center mt-12"
                >
                    <a
                        href="https://photosbyobare24.pixieset.com/mayanlifestylehospital/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-ovicare-primary text-white font-semibold rounded-full shadow-lg hover:shadow-ovicare-primary/40 hover:scale-105 transition-all duration-300"
                    >
                        <span>View Full Gallery</span>
                        <svg
                            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default TeamGallery;
