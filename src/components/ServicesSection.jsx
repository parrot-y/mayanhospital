import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

const services = [
    {
        title: "Neurology services",
        desc: "Explore advanced neurology services for diagnostics and personalized treatment plans neurological well-being with expertise and care.",
        path: "/service/neurology-services",
        image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800",
        targetX: "-32%",
        targetY: "-10%",
        targetRotate: -12,
        zIndex: 40
    },
    {
        title: "Cardiology services",
        desc: "Comprehensive cardiology services providing expert care, precise diagnostics, and personalized treatment plans for heart health excellence.",
        path: "/service/cardiology-services",
        image: "https://images.unsplash.com/photo-1628348068869-42b10a81198a?auto=format&fit=crop&q=80&w=800",
        targetX: "-12%",
        targetY: "15%",
        targetRotate: 5,
        zIndex: 30
    },
    {
        title: "Eye care services",
        desc: "Exceptional eye care services with expert vision care, advanced diagnostics, and personalized treatment plans for visual well-being.",
        path: "/service/eye-care-services",
        image: "https://images.unsplash.com/photo-1576091160550-217359f42f8c?auto=format&fit=crop&q=80&w=800",
        targetX: "12%",
        targetY: "-15%",
        targetRotate: -4,
        zIndex: 20
    },
    {
        title: "Dental services",
        desc: "A Premium dental service offering the expert care, modern treatments, and personalized solutions for optimal oral health",
        path: "/service/dental-services",
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
        targetX: "32%",
        targetY: "8%",
        targetRotate: 15,
        zIndex: 10
    }
];

const ServicesSection = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

    return (
        <section ref={sectionRef} className="relative bg-ovicare-dark py-32 overflow-hidden min-h-[1100px] flex flex-col items-center">
            {/* Background Huge Text - "OVICARE" (Animated with scroll) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <motion.h2
                    style={{
                        opacity: useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 0.05, 0.05, 0]),
                        scale: useTransform(scrollYProgress, [0, 1], [0.8, 1.2]),
                        y: useTransform(scrollYProgress, [0, 1], ["0%", "-10%"])
                    }}
                    className="text-[25vw] font-bold text-ovicare-primary uppercase leading-none"
                >
                    Ovicare
                </motion.h2>
            </div>

            <div className="container relative z-50">
                {/* Header */}
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
                        <div className="w-10 h-10 md:w-14 md:h-14 bg-ovicare-primary rounded-full flex items-center justify-center -rotate-12 group">
                            <motion.img
                                animate={{ rotate: isInView ? 360 : 0 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                src="https://cdn.prod.website-files.com/65c9db2ebeedf24f0e4dec0b/65c9ef098ec979d4fa72d6f3_icon-1.webp"
                                alt="Icon"
                                className="w-1/2 h-1/2 object-contain"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Stacked Cards Area with Scroll-Mapped Spreading */}
                <div className="relative w-full h-[700px] flex items-center justify-center">
                    {services.map((service, i) => {
                        // Progression window for the "spread" (0.2 to 0.5 of section visibility)
                        const start = 0.2 + (i * 0.02); // Small stagger in scroll mapping
                        const end = 0.5 + (i * 0.02);

                        const x = useTransform(scrollYProgress, [start, end], ["0%", service.targetX]);
                        const y = useTransform(scrollYProgress, [start, end], ["70px", service.targetY]);
                        const rotate = useTransform(scrollYProgress, [start, end], [0, service.targetRotate]);
                        const scale = useTransform(scrollYProgress, [start, end], [0.8, 1]);
                        const opacity = useTransform(scrollYProgress, [start - 0.1, start, 0.75, 0.85], [0, 1, 1, 0]);

                        return (
                            <motion.div
                                key={i}
                                style={{
                                    x,
                                    y,
                                    rotate,
                                    scale,
                                    opacity,
                                    zIndex: service.zIndex
                                }}
                                className="absolute w-[280px] md:w-[320px] lg:w-[380px]"
                            >
                                <Link
                                    to={service.path}
                                    className="group block bg-[#161d15] rounded-[50px] overflow-hidden border border-white/5 shadow-2xl shadow-black/80 transition-all duration-500 hover:scale-[1.03] hover:border-ovicare-primary/20"
                                >
                                    {/* Thumbnail */}
                                    <div className="aspect-[4/5] overflow-hidden relative">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                                        />
                                        <div className="absolute top-8 left-8">
                                            <span className="bg-ovicare-primary text-ovicare-dark text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-xl">
                                                Medical
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-10 space-y-5">
                                        <h3 className="text-2xl font-bold uppercase tracking-tight text-ovicare-primary leading-tight group-hover:text-white transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-white/40 text-sm leading-relaxed line-clamp-2 transition-colors group-hover:text-white/60">
                                            {service.desc}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
