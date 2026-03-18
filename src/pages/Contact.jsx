import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import Footer from '../components/FooterRefined';

const Contact = () => {
    return (
        <div className="bg-ovicare-dark min-h-screen">
            <div className="pt-40 pb-20 bg-white/5 border-b border-white/10">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight"
                    >
                        Get in <span className="text-ovicare-primary italic">Touch</span>
                    </motion.h1>
                    <p className="text-xl text-ovicare-text/60 max-w-2xl">
                        Have questions or want to schedule an appointment? Reach out to us today.
                    </p>
                </div>
            </div>

            <section className="py-24 container grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Contact info */}
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-3xl font-bold text-white">Contact Information</h2>
                        <p className="text-ovicare-text/60 text-lg">We are here to help you 24/7. Reach out via any of the methods below.</p>
                    </div>

                    <div className="flex flex-col gap-8">
                        {[
                            { icon: <Phone />, label: "Call Us", val: "+1 234 567 890" },
                            { icon: <Mail />, label: "Email Us", val: "info@ovicare.com" },
                            { icon: <MapPin />, label: "Visit Us", val: "123 Health Ave, Medical District, NY" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-6 p-6 bg-white/5 border border-white/10 rounded-3xl group hover:border-ovicare-primary/30 transition-all">
                                <div className="w-14 h-14 bg-ovicare-primary/10 rounded-2xl flex items-center justify-center text-ovicare-primary group-hover:bg-ovicare-primary group-hover:text-ovicare-dark transition-all">
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="text-ovicare-text/40 text-sm font-bold uppercase tracking-wider">{item.label}</p>
                                    <p className="text-white font-bold text-xl">{item.val}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/5 border border-white/10 p-10 rounded-[40px] shadow-2xl"
                >
                    <form className="flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-ovicare-text/60 ml-2">Full Name</label>
                                <input type="text" placeholder="John Doe" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-ovicare-primary transition-all text-white" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-ovicare-text/60 ml-2">Email Address</label>
                                <input type="email" placeholder="john@example.com" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-ovicare-primary transition-all text-white" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-ovicare-text/60 ml-2">Subject</label>
                            <input type="text" placeholder="Appointment Request" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-ovicare-primary transition-all text-white" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-ovicare-text/60 ml-2">Message</label>
                            <textarea rows="4" placeholder="How can we help you?" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-ovicare-primary transition-all text-white resize-none"></textarea>
                        </div>
                        <button className="bg-ovicare-primary text-ovicare-dark py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-white transition-all transform hover:scale-[1.02]">
                            Send Message <Send size={20} />
                        </button>
                    </form>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
};

export default Contact;
