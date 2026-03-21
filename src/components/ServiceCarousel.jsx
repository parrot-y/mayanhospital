import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Pill, UserRound, FlaskConical, Bed, Accessibility, Baby, Activity, Droplet, Heart, Scale, Apple, Sparkles, Scan } from 'lucide-react';
import { servicesData } from '../utils/servicesData';

const iconMap = {
    Pill, UserRound, FlaskConical, Bed, Accessibility, Baby, Activity, Droplet, Heart, Scale, Apple, Sparkles, Scan
};

const ServiceCard = ({ service }) => {
    const Icon = iconMap[service.icon] || Activity;

    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="flex-shrink-0 w-[300px] md:w-[350px] group"
        >
            <Link to={`/service/${service.id}`} className="block h-full">
                <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 h-full transition-all duration-500 group-hover:bg-white/10 group-hover:border-ovicare-primary/30 group-hover:shadow-[0_20px_50px_rgba(217,254,84,0.1)] relative overflow-hidden">
                    {/* Decorative Background Icon */}
                    <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500">
                        <Icon size={180} />
                    </div>

                    <div className="relative z-10 flex flex-col h-full">
                        <div className="w-16 h-16 rounded-2xl bg-ovicare-primary/10 flex items-center justify-center mb-8 group-hover:bg-ovicare-primary transition-colors duration-500">
                            <Icon className="text-ovicare-primary group-hover:text-ovicare-dark transition-colors duration-500" size={32} />
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-ovicare-primary transition-colors">
                            {service.title}
                        </h3>

                        <p className="text-white/60 mb-8 line-clamp-2 text-base">
                            {service.shortDesc}
                        </p>

                        <div className="mt-auto flex items-center gap-2 text-white font-bold text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                            Learn More <ArrowRight size={16} />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

const ServiceCarousel = () => {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        const checkScroll = () => handleScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, []);

    // Selection for homepage
    const homeServices = servicesData.slice(0, 6);

    return (
        <section className="bg-ovicare-dark py-24 overflow-hidden">
            <div className="container">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-ovicare-primary font-bold uppercase tracking-[0.3em] text-sm mb-4 block"
                        >
                            Our Expertise
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-bold text-white uppercase leading-tight"
                        >
                            Premium <span className="text-ovicare-primary italic">Healthcare</span> Services
                        </motion.h2>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            className={`w-14 h-14 rounded-full border border-white/10 flex items-center justify-center transition-all ${canScrollLeft ? 'hover:bg-ovicare-primary hover:text-ovicare-dark text-white cursor-pointer' : 'text-white/20 cursor-not-allowed'}`}
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            className={`w-14 h-14 rounded-full border border-white/10 flex items-center justify-center transition-all ${canScrollRight ? 'hover:bg-ovicare-primary hover:text-ovicare-dark text-white cursor-pointer' : 'text-white/20 cursor-not-allowed'}`}
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex gap-8 overflow-x-auto pb-12 no-scrollbar snap-x snap-mandatory"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {homeServices.map((service) => (
                        <div key={service.id} className="snap-start">
                            <ServiceCard service={service} />
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        to="/services"
                        className="inline-flex items-center gap-3 text-white/40 hover:text-ovicare-primary transition-colors uppercase tracking-[0.2em] font-bold text-sm group"
                    >
                        View All Services
                        <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                            <ArrowRight size={18} />
                        </motion.span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ServiceCarousel;
