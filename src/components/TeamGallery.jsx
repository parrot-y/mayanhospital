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
            </div>
        </section>
    );
};

export default TeamGallery;
