import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Users, Clock } from 'lucide-react';

const features = [
    { icon: <Award className="text-ovicare-primary" />, title: "Best Medical Support" },
    { icon: <Users className="text-ovicare-primary" />, title: "Expert Professional Doctors" },
    { icon: <Clock className="text-ovicare-primary" />, title: "24 hrs everyday emergency services" },
    { icon: <CheckCircle2 className="text-ovicare-primary" />, title: "Affordable Care Plans" },
];

const About = () => {
    return (
        <section className="py-24 bg-ovicare-dark overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Image Side */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="relative z-10 rounded-[40px] overflow-hidden border-8 border-white/5 shadow-2xl skew-y-1">
                        <img
                            src="/assets/images/about-medical.jpg"
                            alt="Advanced Medical Lab"
                            className="w-full h-full object-cover aspect-[4/3]"
                        />
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-ovicare-primary rounded-[30px] -z-10 opacity-20 blur-2xl" />

                    {/* Experience Badge */}
                    <div className="absolute -bottom-6 -left-6 bg-ovicare-primary p-8 rounded-3xl shadow-2xl z-20 hidden md:block">
                        <p className="text-4xl font-bold text-ovicare-dark">25+</p>
                        <p className="text-ovicare-dark/70 font-bold text-sm uppercase tracking-wider">Years Exp.</p>
                    </div>
                </motion.div>

                {/* Content Side */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-8"
                >
                    <div className="inline-flex items-center gap-2 bg-ovicare-primary/10 border border-ovicare-primary/20 px-4 py-1.5 rounded-full w-fit">
                        <span className="text-ovicare-primary font-semibold text-xs tracking-wider uppercase">About OviCare</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                        We are Providing the <span className="text-ovicare-primary italic">Best Tech</span> Medical Service
                    </h2>

                    <p className="text-lg text-ovicare-text/70 leading-relaxed">
                        OviCare has been at the forefront of medical innovation for over two decades. We combine cutting-edge technology with a human touch to ensure our patients receive the highest standard of care.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        {features.map((f, i) => (
                            <div key={i} className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl hover:border-ovicare-primary/30 transition-all group">
                                <div className="w-10 h-10 bg-ovicare-primary/10 rounded-xl flex items-center justify-center group-hover:bg-ovicare-primary group-hover:text-ovicare-dark transition-all">
                                    {f.icon}
                                </div>
                                <span className="text-white font-bold text-sm tracking-tight">{f.title}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-8 mt-4">
                        <button className="bg-ovicare-primary text-ovicare-dark px-10 py-4 rounded-full font-bold text-lg hover:bg-white transition-all transform hover:scale-105">
                            Read More
                        </button>
                        <div className="flex flex-col">
                            <span className="text-white font-bold text-xl">0728 173 181</span>
                            <span className="text-ovicare-text/50 text-xs font-medium uppercase">Call for Appointment</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
