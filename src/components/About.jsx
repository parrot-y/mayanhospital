import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section className="py-24 bg-ovicare-dark overflow-hidden relative">
            <div className="container">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-12"
                    >
                        <div className="space-y-6">
                            <span className="text-ovicare-primary font-bold uppercase tracking-[0.3em] text-sm">Since 2010</span>
                            <h2 className="text-5xl md:text-7xl font-bold text-white uppercase leading-tight tracking-tighter">
                                Excellence in <span className="text-ovicare-primary italic">Medical</span> Care
                            </h2>
                        </div>

                        <p className="text-xl text-white/50 leading-relaxed max-w-xl">
                            Mayan Lifestyle Hospital is a premier medical facility dedicated to providing top-tier healthcare services. Our state-of-the-art laboratory and professional team ensure accurate diagnostics and personalized care.
                        </p>

                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-4xl font-bold text-ovicare-primary mb-2">15k+</h4>
                                <p className="text-white/40 uppercase tracking-widest text-xs font-bold">Happy Patients</p>
                            </div>
                            <div>
                                <h4 className="text-4xl font-bold text-ovicare-primary mb-2">50+</h4>
                                <p className="text-white/40 uppercase tracking-widest text-xs font-bold">Expert Doctors</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Modern Mask Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1 }}
                        className="relative"
                    >
                        <div className="relative z-10 rounded-[40px] overflow-hidden border-8 border-white/5 shadow-2xl skew-y-1">
                            <img
                                src="/assets/images/about-medical.webp"
                                alt="Advanced Medical Lab"
                                className="w-full h-full object-cover aspect-[4/3]"
                            />
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-ovicare-primary rounded-[30px] -z-10 opacity-20 blur-2xl" />

                        {/* Floating Badge */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute -top-6 -left-6 z-20 bg-ovicare-primary text-ovicare-dark p-6 rounded-3xl font-black text-2xl rotate-12 shadow-2xl"
                        >
                            24/7
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
