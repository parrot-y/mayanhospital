import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWebflowInteraction, webflowVariants } from '../hooks/useWebflowInteraction';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';

const team = [
    {
        name: "Dr. Naina wilson",
        role: "Cardiologist",
        rating: "4.9/5.0",
        image: "https://cdn.prod.website-files.com/65ca09bc91ddc7c352a2acd4/65cc93d2703690000177a3a5_team-3.webp"
    },
    {
        name: "Dr. Elora williams",
        role: "Gynaecologist",
        rating: "4.8/5.0",
        image: "https://cdn.prod.website-files.com/65ca09bc91ddc7c352a2acd4/65cc93baacc7ac557a407afa_team-1.webp"
    },
    {
        name: "Dr. Megan wilson",
        role: "Neurologist",
        rating: "4.6/5.0",
        image: "https://cdn.prod.website-files.com/65ca09bc91ddc7c352a2acd4/65cc93c7853f4172ec5e75d3_team-2.webp"
    },
    {
        name: "Dr. Rehana bilkis",
        role: "Oncologist",
        rating: "4.7/5.0",
        image: "https://cdn.prod.website-files.com/65ca09bc91ddc7c352a2acd4/65d2eec408466597e0c09cb9_team-4.webp"
    }
];

const TeamSlider = () => {
    const { ref, isVisible } = useWebflowInteraction({ threshold: 0.1 });
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % team.length);
        }, 3200); // Refined delay
        return () => clearInterval(timer);
    }, []);

    const next = () => setCurrentIndex((prev) => (prev + 1) % team.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + team.length) % team.length);

    return (
        <section ref={ref} className="bg-ovicare-dark overflow-hidden py-24">
            <div className="container">
                <div className="relative">
                    {/* Slider Controls */}
                    <div className="absolute top-1/2 -left-4 -right-4 md:-left-12 md:-right-12 z-20 flex justify-between pointer-events-none transform -translate-y-1/2">
                        <button
                            onClick={prev}
                            className="w-12 h-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center hover:bg-ovicare-primary transition-all pointer-events-auto group shadow-2xl"
                        >
                            <ChevronLeft className="w-6 h-6 text-white group-hover:text-ovicare-dark" />
                        </button>
                        <button
                            onClick={next}
                            className="w-12 h-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center hover:bg-ovicare-primary transition-all pointer-events-auto group shadow-2xl"
                        >
                            <ChevronRight className="w-6 h-6 text-white group-hover:text-ovicare-dark" />
                        </button>
                    </div>

                    {/* Slides Wrapper */}
                    <div className="relative overflow-hidden rounded-[40px] border border-white/5">
                        <motion.div
                            animate={{ x: `-${currentIndex * 100}%` }}
                            transition={{ duration: 1.2, ease: [0.25, 0.8, 0.25, 1] }}
                            className="flex"
                        >
                            {team.map((member, i) => (
                                <div key={i} className="min-w-full p-4 md:p-8">
                                    <motion.div
                                        whileHover={{ y: -8, scale: 1.01 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        className="relative bg-white/5 rounded-[40px] overflow-hidden group aspect-[16/9] md:aspect-[21/9] cursor-pointer shadow-inner"
                                    >
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-[90%]"
                                        />

                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-ovicare-dark/90 via-ovicare-dark/20 to-transparent" />

                                        <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                                            <div className="space-y-2">
                                                <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-white group-hover:text-ovicare-primary transition-colors duration-500">
                                                    {member.name}
                                                </h3>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-ovicare-primary italic font-medium tracking-wide">{member.role}</span>
                                                    <div className="flex items-center gap-2 text-white/40">
                                                        <Star className="w-4 h-4 fill-ovicare-primary text-ovicare-primary" />
                                                        <span className="text-sm font-bold">{member.rating}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <Link
                                                to="/team"
                                                className="bg-ovicare-primary text-ovicare-dark px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap shadow-xl"
                                            >
                                                View Full Profile
                                            </Link>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center mt-12 gap-3">
                        {team.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={cn(
                                    "w-3 h-3 rounded-full transition-all duration-500 border border-white/10",
                                    currentIndex === i ? "bg-ovicare-primary w-8" : "bg-white/10 hover:bg-white/20"
                                )}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeamSlider;
