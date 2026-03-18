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
        }, 2400); // data-delay="2400"
        return () => clearInterval(timer);
    }, []);

    const next = () => setCurrentIndex((prev) => (prev + 1) % team.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + team.length) % team.length);

    return (
        <section ref={ref} className="bg-ovicare-dark overflow-hidden">
            <div className="container">
                <div className="relative">
                    {/* Slider Controls */}
                    <div className="absolute top-1/2 -left-12 -right-12 z-20 flex justify-between pointer-events-none">
                        <button
                            onClick={prev}
                            className="w-12 h-12 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-ovicare-primary transition-colors pointer-events-auto group"
                        >
                            <ChevronLeft className="w-6 h-6 text-white group-hover:text-ovicare-dark" />
                        </button>
                        <button
                            onClick={next}
                            className="w-12 h-12 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-ovicare-primary transition-colors pointer-events-auto group"
                        >
                            <ChevronRight className="w-6 h-6 text-white group-hover:text-ovicare-dark" />
                        </button>
                    </div>

                    {/* Slides */}
                    <div className="relative overflow-hidden rounded-[40px]">
                        <motion.div
                            animate={{ x: `-${currentIndex * 100}%` }}
                            transition={{ duration: 1.2, ease: [0.25, 0.8, 0.25, 1] }} // data-duration="1200"
                            className="flex"
                        >
                            {team.map((member, i) => (
                                <div key={i} className="min-w-full p-4">
                                    <div className="relative bg-white/5 rounded-[40px] overflow-hidden group aspect-[16/9] md:aspect-[21/9]">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 filter brightness-[85%]"
                                        />

                                        {/* Content Overlays matching Webflow source */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-ovicare-dark/80 via-transparent to-transparent" />

                                        <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                                            <div className="space-y-2">
                                                <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-white group-hover:text-ovicare-primary transition-colors">
                                                    {member.name}
                                                </h3>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-white/60 font-bold uppercase tracking-widest text-sm">{member.role}</span>
                                                    <div className="flex items-center gap-2 text-ovicare-primary">
                                                        <Star className="w-4 h-4 fill-current" />
                                                        <span className="text-sm font-bold">{member.rating}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <Link
                                                to="/team"
                                                className="bg-ovicare-primary text-ovicare-dark px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap"
                                            >
                                                View Profile
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-12 gap-3">
                        {team.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={cn(
                                    "w-12 h-2 rounded-full transition-all duration-500",
                                    currentIndex === i ? "bg-ovicare-primary" : "bg-white/10"
                                )}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeamSlider;
