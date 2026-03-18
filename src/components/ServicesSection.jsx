import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

const services = [
    {
        title: "Neurology services",
        desc: "Explore advanced neurology services for diagnostics and personalized treatment plans neurological well-being with expertise and care.",
        path: "/service/neurology-services",
        image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800", // Brain-like
        rotation: -8,
        x: "-25%",
        y: "-15%",
        zIndex: 40
    },
    {
        title: "Cardiology services",
        desc: "Comprehensive cardiology services providing expert care, precise diagnostics, and personalized treatment plans for heart health excellence.",
        path: "/service/cardiology-services",
        image: "https://images.unsplash.com/photo-1628348068869-42b10a81198a?auto=format&fit=crop&q=80&w=800", // Cardio vibe
        rotation: 4,
        x: "-10%",
        y: "10%",
        zIndex: 30
    },
    {
        title: "Eye care services",
        desc: "Exceptional eye care services with expert vision care, advanced diagnostics, and personalized treatment plans for visual well-being.",
        path: "/service/eye-care-services",
        image: "https://images.unsplash.com/photo-1576091160550-217359f42f8c?auto=format&fit=crop&q=80&w=800", // Eye vibe
        rotation: -2,
        x: "15%",
        y: "-10%",
        zIndex: 20
    },
    {
        title: "Dental services",
        desc: "A Premium dental service offering the expert care, modern treatments, and personalized solutions for optimal oral health",
        path: "/service/dental-services",
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800", // X-ray/Dental
        rotation: 10,
        x: "28%",
        y: "5%",
        zIndex: 10
    }
];

const ServicesSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

    return (
        <section ref={sectionRef} className="relative bg-ovicare-dark py-32 overflow-hidden min-h-[900px] flex flex-col items-center">
            {/* Background Huge Text - "OVICARE" */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 0.05, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="text-[25vw] font-bold text-ovicare-primary uppercase leading-none"
                >
                    Ovicare
                </motion.h2>
            </div>

            <div className="container relative z-50">
                {/* Header - High Fidelity Image 2 Style */}
                <div className="flex flex-col items-start mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8 }}
                        className="flex items-center gap-4"
                    >
                        <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight text-white">
                            Ovicare services
                        </h2>
                        <div className="w-10 h-10 md:w-14 md:h-14 bg-ovicare-primary rounded-full flex items-center justify-center -rotate-12">
                            <img
                                src="https://cdn.prod.website-files.com/65c9db2ebeedf24f0e4dec0b/65c9ef098ec979d4fa72d6f3_icon-1.webp"
                                alt="Icon"
                                className="w-1/2 h-1/2 object-contain"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Stacked Cards Area */}
                <div className="relative w-full h-[600px] flex items-center justify-center">
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                opacity: 0,
                                x: 0,
                                y: 50,
                                rotate: 0
                            }}
                            animate={isInView ? {
                                opacity: 1,
                                x: service.x,
                                y: service.y,
                                rotate: service.rotation
                            } : {
                                opacity: 0,
                                x: 0,
                                y: 50,
                                rotate: 0
                            }}
                            transition={{
                                delay: i * 0.1,
                                duration: 1.2,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            style={{ zIndex: service.zIndex }}
                            className="absolute w-[280px] md:w-[320px] lg:w-[350px]"
                        >
                            <Link
                                to={service.path}
                                className="group block bg-[#161d15] rounded-[40px] overflow-hidden border border-white/10 shadow-2xl shadow-black/50 transition-transform duration-500 hover:scale-[1.05]"
                            >
                                {/* Thumbnail */}
                                <div className="aspect-[4/5] overflow-hidden relative">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0"
                                    />
                                    {/* Subtitle / Category - Lime Green vibe from Image 2 */}
                                    <div className="absolute top-6 left-6">
                                        <span className="bg-ovicare-primary text-ovicare-dark text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                                            Medical
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 space-y-4">
                                    <h3 className="text-xl font-bold uppercase tracking-tight text-ovicare-primary leading-tight">
                                        {service.title}
                                    </h3>
                                    <p className="text-white/40 text-sm leading-relaxed line-clamp-2">
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
