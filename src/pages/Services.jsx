import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Pill, UserRound, FlaskConical, Bed, Accessibility, Baby, Activity, Droplet, Heart, Scale, Apple, Sparkles, Scan, ArrowRight } from 'lucide-react';
import { servicesData } from '../utils/servicesData';
import MarqueeTicker from '../components/MarqueeTicker';

const iconMap = {
    Pill, UserRound, FlaskConical, Bed, Accessibility, Baby, Activity, Droplet, Heart, Scale, Apple, Sparkles, Scan
};

const Services = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-ovicare-dark min-h-screen">
            <div className="pt-40 pb-24 bg-white/5 border-b border-white/10">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-ovicare-primary/10 border border-ovicare-primary/20 text-ovicare-primary text-xs font-bold uppercase tracking-[0.2em] mb-6"
                    >
                        Our Medical Solutions
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-8xl font-bold text-white uppercase mb-8 leading-[0.9] tracking-tighter"
                    >
                        Our <span className="text-ovicare-primary italic">Services</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/40 max-w-2xl text-lg md:text-xl leading-relaxed"
                    >
                        We provide a comprehensive range of medical services designed to meet all your healthcare needs with excellence, professionalism, and compassion.
                    </motion.p>
                </div>
            </div>

            <div className="py-24">
                <div className="container grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicesData.map((service, i) => {
                        const Icon = iconMap[service.icon] || Heart;
                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: (i % 3) * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Link to={`/service/${service.id}`} className="group block h-full">
                                    <div className="bg-white/5 border border-white/10 rounded-[40px] p-10 h-full transition-all duration-500 hover:bg-white/10 hover:border-ovicare-primary/30 group-hover:-translate-y-2 relative overflow-hidden">
                                        {/* Background Glow */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-ovicare-primary/5 blur-[60px] group-hover:bg-ovicare-primary/10 transition-colors duration-500" />

                                        <div className="w-16 h-16 rounded-2xl bg-ovicare-primary/10 flex items-center justify-center mb-8 group-hover:bg-ovicare-primary transition-colors duration-500">
                                            <Icon className="text-ovicare-primary group-hover:text-ovicare-dark transition-colors duration-500" size={32} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-ovicare-primary transition-colors uppercase tracking-tight">
                                            {service.title}
                                        </h3>
                                        <p className="text-white/40 leading-relaxed mb-8 line-clamp-3">
                                            {service.shortDesc}
                                        </p>
                                        <div className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-widest group-hover:gap-4 transition-all italic">
                                            Explore Details <ArrowRight size={16} />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <MarqueeTicker />
        </div>
    );
};

export default Services;
