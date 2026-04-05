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
                            <div className="flex items-center gap-4">
                                <div className="h-20">
                                    <img
                                        src="/assets/images/logo.webp"
                                        alt="Mayan Lifestyle Hospital"
                                        className="h-full w-auto object-contain"
                                    />
                                </div>
                            </div>
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
                                {['Home', 'About', 'Services', 'Contact'].map((item) => (
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
                                <a href="tel:254728173181" className="flex items-center gap-4 text-white/40 hover:text-white transition-colors group">
                                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-ovicare-primary/20 transition-colors">
                                        <Phone size={18} className="text-ovicare-primary" />
                                    </div>
                                    <span className="text-sm font-medium tracking-wide">0728 173 181</span>
                                </a>
                                <a href="mailto:mayanlifestylehospital@gmail.com" className="flex items-center gap-4 text-white/40 hover:text-white transition-colors group">
                                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-ovicare-primary/20 transition-colors">
                                        <Mail size={18} className="text-ovicare-primary" />
                                    </div>
                                    <span className="text-sm font-medium tracking-wide">mayanlifestylehospital@gmail.com</span>
                                </a>
                                <div className="flex items-center gap-4 text-white/40 group">
                                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                                        <MapPin size={18} className="text-ovicare-primary" />
                                    </div>
                                    <span className="text-sm font-medium tracking-wide leading-tight">Mayan Lifestyle Hospital, Kiambu, Kenya</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="mb-24 w-full h-[300px] md:h-[400px] rounded-[30px] overflow-hidden border border-white/10 shadow-2xl">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d270.4124096726395!2d36.825650102729384!3d-1.1683580030582428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f3dc88d6b13a9%3A0x84cdf203cafa156a!2sMayan%20Lifestyle%20Medical%20Center!5e1!3m2!1ssw!2ske!4v1774259447276!5m2!1ssw!2ske"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
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
