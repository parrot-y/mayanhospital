import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const doctors = [
    { name: "Dr. Sarah Jenkins", role: "Chief Cardiologist", img: "/assets/images/hero-doctor.jpg" },
    { name: "Dr. Michael Chen", role: "Neurosurgeon", img: "/assets/images/team.jpg" },
    { name: "Dr. Emily Smith", role: "Pediatrician", img: "/assets/images/hero-doctor.jpg" },
];

const Team = () => {
    return (
        <section className="py-24 bg-white/5 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 bg-ovicare-primary/10 border border-ovicare-primary/20 px-4 py-1.5 rounded-full mb-6">
                        <span className="text-ovicare-primary font-semibold text-xs tracking-wider uppercase">Our Specialists</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Meet Our Expert <span className="text-ovicare-primary italic">Medical Team</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {doctors.map((doc, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative"
                        >
                            <div className="relative rounded-[40px] overflow-hidden aspect-[3/4] border-4 border-white/5 mb-6">
                                <img src={doc.img} alt={doc.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                                {/* Overlay with Socials */}
                                <div className="absolute inset-0 bg-ovicare-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                    {[Facebook, Twitter, Linkedin, Instagram].map((Icon, idx) => (
                                        <button key={idx} className="w-10 h-10 bg-ovicare-primary rounded-full flex items-center justify-center text-ovicare-dark hover:bg-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-[calc(idx*50ms)]">
                                            <Icon size={20} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-white mb-1">{doc.name}</h3>
                                <p className="text-ovicare-primary font-medium">{doc.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
