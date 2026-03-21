import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const FooterRefined = () => {
    return (
        <footer className="bg-ovicare-dark pt-32 pb-12 border-t border-white/5">
            <div className="container">
                {/* Upper Footer - Large Branding */}
                <div className="grid lg:grid-cols-12 gap-16 mb-24">
                    <div className="lg:col-span-6 space-y-12">
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="inline-block px-4 py-1.5 rounded-full bg-ovicare-primary/10 border border-ovicare-primary/20 text-ovicare-primary text-xs font-bold uppercase tracking-[0.2em]"
                            >
                                Premium Healthcare
                            </motion.div>
                            <h2 className="responsive-title text-white">
                                Mayan Lifestyle <br />
                                <span className="text-ovicare-primary italic">Hospital & Pharmacy</span>
                            </h2>
                        </div>

                        <p className="text-xl text-white/40 leading-relaxed max-w-md">
                            Dedicated to providing world-class medical services with a personalized touch for your family's well-being.
                        </p>

                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <motion.a
                                    key={i}
                                    href="#"
                                    whileHover={{ y: -5, backgroundColor: '#d9fe54', color: '#092f26' }}
                                    className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 text-white transition-all duration-300"
                                >
                                    <Icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-12">
                        {/* Quick Links */}
                        <div className="space-y-8">
                            <h4 className="text-white font-bold uppercase tracking-widest text-sm">Navigation</h4>
                            <ul className="space-y-4">
                                {['Home', 'About', 'Services', 'Team', 'Contact'].map((item) => (
                                    <li key={item}>
                                        <Link
                                            to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                            className="text-white/40 hover:text-ovicare-primary transition-colors flex items-center gap-2 group"
                                        >
                                            <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services */}
                        <div className="space-y-8">
                            <h4 className="text-white font-bold uppercase tracking-widest text-sm">Services</h4>
                            <ul className="space-y-4">
                                {['Pharmacy', 'Consultation', 'Laboratory', 'Maternity'].map((item) => (
                                    <li key={item}>
                                        <Link
                                            to="/services"
                                            className="text-white/40 hover:text-ovicare-primary transition-colors"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-8 col-span-2 md:col-span-1">
                            <h4 className="text-white font-bold uppercase tracking-widest text-sm">Contact Us</h4>
                            <div className="space-y-6">
                                <a href="tel:+2547XXXXXXXX" className="flex items-center gap-4 text-white/40 hover:text-white transition-colors group">
                                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-ovicare-primary/20 transition-colors">
                                        <Phone size={18} className="text-ovicare-primary" />
                                    </div>
                                    <span className="text-sm font-medium tracking-wide">+254 7XX XXX XXX</span>
                                </a>
                                <a href="mailto:info@mayanlifestyle.com" className="flex items-center gap-4 text-white/40 hover:text-white transition-colors group">
                                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-ovicare-primary/20 transition-colors">
                                        <Mail size={18} className="text-ovicare-primary" />
                                    </div>
                                    <span className="text-sm font-medium tracking-wide">info@mayanlifestyle.com</span>
                                </a>
                                <div className="flex items-center gap-4 text-white/40 group">
                                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                                        <MapPin size={18} className="text-ovicare-primary" />
                                    </div>
                                    <span className="text-sm font-medium tracking-wide leading-tight">Mayan Lifestyle Hospital, Kenya</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-white/20 text-sm font-medium tracking-wider">
                        © {new Date().getFullYear()} Mayan Lifestyle Hospital and Pharmacy. All Rights Reserved.
                    </p>
                    <div className="flex gap-8">
                        <a href="#" className="text-white/20 hover:text-white transition-colors text-xs font-bold uppercase tracking-[0.2em]">Privacy Policy</a>
                        <a href="#" className="text-white/20 hover:text-white transition-colors text-xs font-bold uppercase tracking-[0.2em]">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterRefined;
