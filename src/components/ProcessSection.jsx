import React from 'react';
import { motion } from 'framer-motion';
import { useWebflowInteraction, webflowVariants } from '../hooks/useWebflowInteraction';

const ProcessSection = () => {
    const { ref, isVisible } = useWebflowInteraction({ threshold: 0.1 });

    const steps = [
        {
            title: "Book appointment",
            desc: "Experience hassle-free healthcare with our online booking system. Secure your medical appointment conveniently, ensuring prompt access to expert care."
        },
        {
            title: "Conduct checkup",
            desc: "Ensure your well-being with a comprehensive medical checkup, where our skilled professionals conduct thorough assessments for a proactive approach."
        },
        {
            title: "Perform treatment",
            desc: "Experience personalized care as our expert medical team performs advanced treatments, utilizing cutting-edge techniques to optimize your health."
        },
        {
            title: "Prescribe payment",
            desc: "Upon consultation, our healthcare professionals will prescribe a transparent payment plan, ensuring clarity and ease in managing your expenses."
        }
    ];

    return (
        <section ref={ref} className="bg-ovicare-dark text-white">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    {/* Left: Content */}
                    <div className="space-y-12">
                        <motion.div
                            initial="hidden"
                            animate={isVisible ? "visible" : "hidden"}
                            variants={webflowVariants}
                            className="space-y-4"
                        >
                            <h2 className="uppercase tracking-tight">Essential medical navigation</h2>
                        </motion.div>

                        <div className="relative pl-8 space-y-16 border-l border-white/10">
                            {steps.map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial="hidden"
                                    animate={isVisible ? "visible" : "hidden"}
                                    custom={i + 1}
                                    variants={webflowVariants}
                                    className="relative group"
                                >
                                    {/* Dot on the line */}
                                    <div className="absolute -left-[37px] top-2 w-4 h-4 bg-ovicare-dark border-2 border-white/20 rounded-full group-hover:border-ovicare-primary transition-colors z-10" />

                                    <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight group-hover:text-ovicare-primary transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-white/60 text-lg leading-relaxed">
                                        {step.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Sticky Image */}
                    <div className="lg:sticky lg:top-40">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                            animate={isVisible ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
                            transition={{ duration: 1.2, ease: [0.25, 0.8, 0.25, 1] }}
                            className="relative aspect-[4/3] md:aspect-square rounded-[40px] overflow-hidden group shadow-2xl"
                        >
                            <img
                                src="/assets/images/pharmacy_counter.jpg"
                                alt="Mayan Lifestyle Hospital Pharmacy"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute bottom-8 right-8 w-24 h-24 bg-ovicare-primary rounded-3xl rotate-12 flex items-center justify-center">
                                <img
                                    src="https://cdn.prod.website-files.com/65c9db2ebeedf24f0e4dec0b/65c9fcfd2219fa989d8a1709_icon-2.webp"
                                    alt="Icon 2"
                                    className="w-1/2 h-1/2 object-contain -rotate-12"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
