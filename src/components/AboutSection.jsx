import React from 'react';
import { motion } from 'framer-motion';
import { useWebflowInteraction, webflowVariants } from '../hooks/useWebflowInteraction';

const AboutSection = () => {
    const { ref, isVisible } = useWebflowInteraction({ threshold: 0.2 });

    return (
        <section ref={ref} className="bg-ovicare-dark text-white border-t border-white/5">
            <div className="container">

                {/* Section Title */}
                <motion.div
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    variants={webflowVariants}
                    className="mb-16"
                >
                    <h2 className="uppercase tracking-tight max-w-2xl">
                        Essential insights about medical advances
                    </h2>
                </motion.div>

                {/* Grid: Image + Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
                        className="rounded-[40px] overflow-hidden aspect-[4/5] group border border-white/5"
                    >
                        <img
                            src="/assets/images/mri_scanner.png"
                            alt="Medical"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-[90%]"
                        />
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                        custom={1}
                        variants={webflowVariants}
                        className="space-y-8"
                    >
                        <div className="w-16 h-16">
                            <img
                                src="https://cdn.prod.website-files.com/65c9db2ebeedf24f0e4dec0b/65c9fcfd2219fa989d8a1709_icon-2.webp"
                                alt="Icon"
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <div className="relative">
                            <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
                                As pioneers in medical research and clinic standards, we set the benchmark for excellence.
                                Our commitment to innovation and patient-centric care defines us as leaders in the field.
                            </p>
                            {/* Text overlay animation element */}
                            <motion.div
                                initial={{ scaleX: 1, originX: 0 }}
                                animate={isVisible ? { scaleX: 0 } : {}}
                                transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
                                className="absolute inset-0 bg-ovicare-dark pointer-events-none"
                                style={{ transformOrigin: 'right' }}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
