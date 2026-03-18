import React from 'react';
import { motion } from 'framer-motion';
import { useWebflowInteraction, webflowVariants } from '../hooks/useWebflowInteraction';
import { Link } from 'react-router-dom';

const services = [
    {
        title: "Neurology services",
        desc: "Explore advanced neurology services for diagnostics and personalized treatment plans neurological well-being with expertise and care.",
        path: "/service/neurology-services",
        image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "Cardiology services",
        desc: "Comprehensive cardiology services providing expert care, precise diagnostics, and personalized treatment plans for heart health excellence.",
        path: "/service/cardiology-services",
        image: "https://images.unsplash.com/photo-1628348068869-42b10a81198a?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "Eye care services",
        desc: "Exceptional eye care services with expert vision care, advanced diagnostics, and personalized treatment plans for visual well-being.",
        path: "/service/eye-care-services",
        image: "https://images.unsplash.com/photo-1576091160550-217359f42f8c?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "Dental services",
        desc: "A Premium dental service offering the expert care, modern treatments, and personalized solutions for optimal oral health",
        path: "/service/dental-services",
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800"
    }
];

const ServicesSection = () => {
    const { ref, isVisible } = useWebflowInteraction({ threshold: 0.1 });

    return (
        <section ref={ref} className="bg-ovicare-dark">
            <div className="container">
                {/* Header */}
                <div className="flex items-center justify-between mb-20">
                    <motion.div
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                        variants={webflowVariants}
                        className="flex items-center gap-6"
                    >
                        <h2 className="uppercase tracking-tight">Ovicare services</h2>
                        <div className="w-12 h-12 bg-ovicare-primary rounded-full flex items-center justify-center -rotate-12">
                            <img
                                src="https://cdn.prod.website-files.com/65c9db2ebeedf24f0e4dec0b/65c9ef098ec979d4fa72d6f3_icon-1.webp"
                                alt="Icon"
                                className="w-1/2 h-1/2 object-contain"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            initial="hidden"
                            animate={isVisible ? "visible" : "hidden"}
                            custom={i + 1}
                            variants={webflowVariants}
                        >
                            <Link
                                to={service.path}
                                className="group block relative bg-white/5 rounded-[40px] overflow-hidden border border-white/5 transition-all duration-500 hover:translate-y-[-6px] hover:scale-[1.02] hover:bg-white/10"
                            >
                                {/* Thumbnail */}
                                <div className="aspect-[4/3] overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 filter brightness-[80%] group-hover:brightness-[100%]"
                                    />
                                </div>

                                {/* Overlay layer for "CMS hover feel" */}
                                <div className="absolute inset-0 bg-ovicare-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                {/* Content */}
                                <div className="p-8 space-y-4">
                                    <h3 className="text-2xl font-bold uppercase tracking-tight group-hover:text-ovicare-primary transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-white/60 line-clamp-3">
                                        {service.desc}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
