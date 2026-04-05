import React from 'react';
import { motion } from 'framer-motion';
import { useWebflowInteraction, webflowVariants } from '../hooks/useWebflowInteraction';
import { Quote } from 'lucide-react';

const TestimonialSection = () => {
    const { ref, isVisible } = useWebflowInteraction({ threshold: 0.1 });

    const testimonials = [
        {
            quote: "Exceptional care! The medical team's expertise and compassion made my recovery swift and reassuring. Grateful for their dedication",
            author: "James Kamau",
            role: "Entrepreneur / Kiambu Business Council"
        },
        {
            quote: "Outstanding medical expertise! The accurate diagnosis and effective treatment plan greatly improved my quality of life. Truly grateful.",
            author: "Sharon Wanjiku",
            role: "Teacher / Thika High School"
        },
        {
            quote: "Highly recommend! The personalized approach to my health concerns was outstanding. A team that truly cares about patients' well-being",
            author: "David Mwangi",
            role: "Farmer / Githunguri Dairy"
        }
    ];

    return (
        <section ref={ref} className="bg-ovicare-dark text-white border-t border-white/5">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <motion.div
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                        variants={webflowVariants}
                        className="md:max-w-xl"
                    >
                        <h2 className="uppercase tracking-tight">Grateful testimony by renewed health</h2>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                        custom={1}
                        variants={webflowVariants}
                        className="text-white/60 font-bold uppercase tracking-widest text-sm"
                    >
                        Rated <span className="text-ovicare-primary">4.9</span> out of 5 based on <span className="text-ovicare-primary">768</span> reviews
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {testimonials.map((item, i) => (
                        <motion.div
                            key={i}
                            initial="hidden"
                            animate={isVisible ? "visible" : "hidden"}
                            custom={i + 2}
                            variants={webflowVariants}
                            className="bg-white/5 p-12 rounded-[40px] border border-white/5 flex flex-col justify-between group hover:bg-white/10 transition-colors"
                        >
                            <div className="space-y-8">
                                <Quote className="w-12 h-12 text-ovicare-primary opacity-50" />
                                <p className="text-2xl font-medium leading-normal italic">
                                    "{item.quote}"
                                </p>
                            </div>
                            <div className="mt-12">
                                <h4 className="font-bold uppercase tracking-tight text-xl">{item.author}</h4>
                                <p className="text-white/40 text-sm font-bold uppercase tracking-widest mt-2">{item.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
