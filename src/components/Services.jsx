import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Brain, Eye, Stethoscope, Activity, Thermometer } from 'lucide-react';

const services = [
    {
        title: "Cardiology",
        desc: "Comprehensive heart care including diagnostics, treatment, and preventive services.",
        icon: <Heart className="w-8 h-8" />,
        link: "/service/cardiology"
    },
    {
        title: "Neurology",
        desc: "Expert care for brain and nervous system disorders with advanced technology.",
        icon: <Brain className="w-8 h-8" />,
        link: "/service/neurology"
    },
    {
        title: "Eye Care",
        desc: "Specialized vision care from routine exams to complex surgical procedures.",
        icon: <Eye className="w-8 h-8" />,
        link: "/service/eye-care"
    },
    {
        title: "General Checkup",
        desc: "Routine health screenings and preventive care for all age groups.",
        icon: <Stethoscope className="w-8 h-8" />,
        link: "/service/general"
    },
    {
        title: "Diagnostics",
        desc: "Accurate and timely diagnostic testing utilizing state-of-the-art labs.",
        icon: <Activity className="w-8 h-8" />,
        link: "/service/diagnostics"
    },
    {
        title: "Emergency Care",
        desc: "Rapid response and critical care services available 24 hours a day.",
        icon: <Thermometer className="w-8 h-8" />,
        link: "/service/emergency"
    }
];

const Services = () => {
    return (
        <section className="py-24 bg-white/5 border-t border-white/10 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Our Comprehensive <span className="text-ovicare-primary italic">Medical Services</span>
                        </h2>
                        <p className="text-ovicare-text/60 text-lg">
                            We offer a wide range of specialized medical services tailored to meet your unique health needs with excellence and compassion.
                        </p>
                    </div>
                    <button className="text-ovicare-primary font-bold flex items-center gap-2 group border-b border-ovicare-primary/20 pb-1 hover:border-ovicare-primary transition-all">
                        See All Services
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-ovicare-dark/50 border border-white/10 p-8 rounded-[30px] hover:border-ovicare-primary/50 transition-all group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-ovicare-primary/5 rounded-full blur-2xl group-hover:bg-ovicare-primary/10 transition-colors" />

                            <div className="w-16 h-16 bg-ovicare-primary/10 rounded-2xl flex items-center justify-center text-ovicare-primary mb-8 group-hover:bg-ovicare-primary group-hover:text-ovicare-dark transition-all duration-500">
                                {service.icon}
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-ovicare-primary transition-colors">
                                {service.title}
                            </h3>

                            <p className="text-ovicare-text/60 leading-relaxed mb-8">
                                {service.desc}
                            </p>

                            <button className="w-full py-4 border border-white/10 rounded-2xl text-white font-bold group-hover:bg-ovicare-primary group-hover:text-ovicare-dark group-hover:border-ovicare-primary transition-all flex items-center justify-center gap-2">
                                Learn More
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
