import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useWebflowInteraction, webflowVariants } from '../hooks/useWebflowInteraction';

const Hero = () => {
    const { ref, isVisible } = useWebflowInteraction({ threshold: 0.1 });

    return (
        <section ref={ref} className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden bg-ovicare-dark">
            <div className="container relative z-10">
                <div className="flex flex-col space-y-4 md:space-y-6">
                    {/* Top Line - Left Aligned */}
                    <motion.div
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                        custom={0}
                        variants={webflowVariants}
                        className="flex justify-start"
                    >
                        <h1 className="hero-title text-white uppercase tracking-tight">
                            For better
                        </h1>
                    </motion.div>

                    {/* Bottom Line - Right Aligned with Icon */}
                    <motion.div
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                        custom={1}
                        variants={webflowVariants}
                        className="flex justify-end items-center gap-3 md:gap-8"
                    >
                        <h2 className="hero-title text-ovicare-primary italic uppercase tracking-tight">
                            Healthcare
                        </h2>
                        <div className="w-14 h-14 md:w-24 md:h-24 bg-ovicare-primary rounded-full flex items-center justify-center -rotate-12 flex-shrink-0">
                            <img
                                src="https://cdn.prod.website-files.com/65c9db2ebeedf24f0e4dec0b/65c9ef098ec979d4fa72d6f3_icon-1.webp"
                                alt="Icon"
                                className="w-1/2 h-1/2 object-contain"
                            />
                        </div>
                    </motion.div>

                    {/* Description and CTA */}
                    <motion.div
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                        custom={2}
                        variants={webflowVariants}
                        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mt-4"
                    >
                        <p className="text-lg md:text-xl text-ovicare-text/60 max-w-xl leading-relaxed">
                            With Mayan Lifestyle Hospital, your health is our priority. We offer comprehensive medical services, personalized care plans, and a dedicated team of professionals committed to your well-being.
                        </p>
                        <Link
                            to="/appointment"
                            className="bg-ovicare-primary text-ovicare-dark px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-white transition-all transform hover:scale-[1.05]"
                        >
                            Get Appointment!
                        </Link>
                    </motion.div>

                    {/* Large Hero Image with Filter */}
                    <motion.div
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                        custom={3}
                        variants={webflowVariants}
                        className="mt-12 md:mt-20 relative w-full aspect-[16/7] rounded-[40px] overflow-hidden group border border-white/5"
                    >
                        <img
                            src="/assets/images/hospital_exterior.png"
                            alt="Advanced Healthcare"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 filter brightness-[85%]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ovicare-dark/60 via-transparent to-transparent pointer-events-none" />
                    </motion.div>
                </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-ovicare-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-ovicare-primary/5 rounded-full blur-[100px] pointer-events-none" />
        </section>
    );
};

export default Hero;
