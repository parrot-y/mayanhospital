import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useWebflowInteraction, webflowVariants } from '../hooks/useWebflowInteraction';

const CTASection = () => {
    const { ref, isVisible } = useWebflowInteraction({ threshold: 0.2 });

    return (
        <section ref={ref} className="bg-ovicare-dark border-y border-white/5 overflow-hidden">
            <div className="container flex flex-col items-center text-center gap-8">

                {/* Emergency subtitle with shape icon */}
                <motion.div
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    custom={0}
                    variants={webflowVariants}
                    className="flex items-center gap-4"
                >
                    <h2 className="text-ovicare-primary uppercase tracking-tight">Emergency</h2>
                    <div className="w-12 h-12 rotate-12">
                        <img
                            src="https://cdn.prod.website-files.com/65c9db2ebeedf24f0e4dec0b/65cc8bb81e657db2bce85281_icon-4.webp"
                            alt="emergency"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </motion.div>

                {/* Main Title */}
                <motion.h2
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    custom={1}
                    variants={webflowVariants}
                    className="text-white max-w-3xl uppercase tracking-tight"
                >
                    Helpline service
                </motion.h2>

                {/* Contact info */}
                <motion.div
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    custom={2}
                    variants={webflowVariants}
                    className="flex flex-wrap justify-center items-center gap-6"
                >
                    <a
                        href="tel:254728173181"
                        className="text-2xl md:text-3xl font-bold text-white hover:text-ovicare-primary transition-colors"
                    >
                        0728 173 181
                    </a>
                    <div className="w-px h-8 bg-white/20" />
                    <a
                        href="mailto:mayanlifestylehospital@gmail.com"
                        className="text-2xl md:text-3xl font-bold text-white hover:text-ovicare-primary transition-colors"
                    >
                        mayanlifestylehospital@gmail.com
                    </a>
                </motion.div>

                {/* Button */}
                <motion.div
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    custom={3}
                    variants={webflowVariants}
                >
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-3 bg-ovicare-primary text-ovicare-dark px-10 py-5 rounded-full font-bold text-lg hover:bg-white transition-all transform hover:scale-105 active:scale-95"
                    >
                        Emergency contact us
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;
