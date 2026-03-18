import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Clock, Send } from 'lucide-react';
import Footer from '../components/FooterRefined';
import MarqueeTicker from '../components/MarqueeTicker';
import { useWebflowInteraction, webflowVariants } from '../hooks/useWebflowInteraction';

const Appointment = () => {
    const { ref, isVisible } = useWebflowInteraction({ threshold: 0.1 });

    return (
        <div className="bg-ovicare-dark min-h-screen">
            {/* Hero Section */}
            <div className="pt-40 pb-20 bg-white/5 border-b border-white/10">
                <div className="container">
                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        variants={webflowVariants}
                        className="text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight"
                    >
                        Appoint<span className="text-ovicare-primary italic">ments</span>
                    </motion.h1>
                    <motion.p
                        initial="hidden"
                        animate="visible"
                        custom={1}
                        variants={webflowVariants}
                        className="text-xl text-ovicare-text/60 max-w-2xl"
                    >
                        Schedule your visit with our specialist doctors. We provide priority care and flexible scheduling for our patients.
                    </motion.p>
                </div>
            </div>

            {/* Content Section */}
            <section ref={ref} className="py-24 container grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Left: Contact/Info */}
                <div className="flex flex-col gap-10">
                    <motion.div
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                        custom={0}
                        variants={webflowVariants}
                        className="flex flex-col gap-4"
                    >
                        <h2 className="text-3xl font-bold text-white uppercase tracking-tight">Booking Information</h2>
                        <p className="text-ovicare-text/60 text-lg">Our patient coordinator will contact you within 24 hours to confirm your appointment time and specialist availability.</p>
                    </motion.div>

                    <div className="flex flex-col gap-6">
                        {[
                            { icon: <Phone />, label: "Emergency Line", val: "+1(789) -123-4567" },
                            { icon: <Mail />, label: "Support Email", val: "info@example.com" },
                            { icon: <Clock />, label: "Working Hours", val: "Mon - Sat: 9:00 AM - 9:00 PM" },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial="hidden"
                                animate={isVisible ? "visible" : "hidden"}
                                custom={i + 1}
                                variants={webflowVariants}
                                className="flex items-center gap-6 p-6 bg-white/5 border border-white/10 rounded-3xl group hover:border-ovicare-primary/30 transition-all"
                            >
                                <div className="w-12 h-12 bg-ovicare-primary/10 rounded-2xl flex items-center justify-center text-ovicare-primary group-hover:bg-ovicare-primary group-hover:text-ovicare-dark transition-all">
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="text-ovicare-text/40 text-[10px] font-bold uppercase tracking-widest">{item.label}</p>
                                    <p className="text-white font-bold text-lg">{item.val}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right: Appointment Form */}
                <motion.div
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    custom={2}
                    variants={webflowVariants}
                    className="bg-white/5 border border-white/10 p-10 rounded-[40px] shadow-2xl"
                >
                    <form className="flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-ovicare-text/40 uppercase tracking-widest ml-2">Full Name</label>
                                <input type="text" placeholder="Your Name" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-ovicare-primary transition-all text-white" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-ovicare-text/40 uppercase tracking-widest ml-2">Email Address</label>
                                <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-ovicare-primary transition-all text-white" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-ovicare-text/40 uppercase tracking-widest ml-2">Phone Number</label>
                                <input type="tel" placeholder="Phone" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-ovicare-primary transition-all text-white" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-ovicare-text/40 uppercase tracking-widest ml-2">Preferred Date</label>
                                <input type="date" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-ovicare-primary transition-all text-white" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-ovicare-text/40 uppercase tracking-widest ml-2">Select Specialist</label>
                            <select className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-ovicare-primary transition-all text-white appearance-none">
                                <option className="bg-ovicare-dark">Cardiologist</option>
                                <option className="bg-ovicare-dark">Neurologist</option>
                                <option className="bg-ovicare-dark">Pediatrician</option>
                                <option className="bg-ovicare-dark">Gynaecologist</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-ovicare-text/40 uppercase tracking-widest ml-2">Message</label>
                            <textarea rows="4" placeholder="How can we help you?" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-ovicare-primary transition-all text-white resize-none"></textarea>
                        </div>
                        <button className="bg-ovicare-primary text-ovicare-dark py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-white transition-all transform hover:scale-[1.02]">
                            Book Now <Send size={20} />
                        </button>
                    </form>
                </motion.div>
            </section>

            <MarqueeTicker />
            <Footer />
        </div>
    );
};

export default Appointment;
