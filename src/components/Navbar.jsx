import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../utils/cn';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Medicines', path: '/medicines' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-6",
                    isScrolled ? "bg-ovicare-dark/90 backdrop-blur-md py-4 border-b border-white/5" : "bg-transparent"
                )}
            >
                <div className="container flex items-center justify-between">
                    <Link to="/" className="relative z-10 flex items-center gap-2 md:gap-3 group">
                        <div className="h-16 md:h-20 transition-transform duration-500 group-hover:scale-105">
                            <img
                                src="/assets/images/logo.png"
                                alt="Mayan Lifestyle Hospital"
                                className="h-full w-auto object-contain"
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={cn(
                                    "text-sm font-bold uppercase tracking-widest transition-colors hover:text-ovicare-primary",
                                    location.pathname === link.path ? "text-ovicare-primary" : "text-white"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-6">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="flex items-center space-x-3 group cursor-pointer"
                        >
                            <div className="hidden lg:block text-white font-bold uppercase tracking-widest text-sm group-hover:text-ovicare-primary transition-colors">Menu</div>
                            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-ovicare-primary transition-all duration-500">
                                <Menu className="w-5 h-5 text-white group-hover:text-ovicare-dark transition-colors" />
                            </div>
                        </button>

                        <Link
                            to="/appointment"
                            className="hidden sm:flex items-center space-x-3 bg-ovicare-primary text-ovicare-dark px-6 py-3 rounded-full font-bold text-sm hover:bg-white transition-all transform hover:scale-105 active:scale-95 group"
                        >
                            <div className="w-2 h-2 bg-ovicare-dark rounded-full group-hover:animate-ping" />
                            <span>Get Appointment!</span>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Sidebar Drawer */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 bg-ovicare-dark/80 backdrop-blur-sm z-[60]"
                        />

                        {/* Drawer Content */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-full md:w-[500px] bg-ovicare-dark z-[70] p-12 flex flex-col justify-between shadow-2xl overflow-y-auto"
                        >
                            {/* Top Content */}
                            <div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-16 flex items-center justify-center">
                                            <img
                                                src="/assets/images/logo.png"
                                                alt="Mayan Lifestyle Hospital"
                                                className="h-full w-auto object-contain"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsSidebarOpen(false)}
                                        className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-ovicare-primary transition-colors group"
                                    >
                                        <X className="w-6 h-6 text-white group-hover:text-ovicare-dark" />
                                    </button>
                                </div>

                                {/* Navigation */}
                                <div className="flex flex-col space-y-8 mt-16">
                                    {navLinks.map((link, i) => (
                                        <motion.div
                                            key={link.path}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 * i }}
                                        >
                                            <Link
                                                to={link.path}
                                                onClick={() => setIsSidebarOpen(false)}
                                                className="text-4xl md:text-6xl font-bold hover:text-ovicare-primary transition-colors uppercase leading-none"
                                            >
                                                {link.name}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Bottom Content */}
                            <div className="mt-12 flex flex-col gap-12 border-t border-white/10 pt-12">
                                <div className="space-y-6">
                                    <p className="text-ovicare-text/40 font-bold uppercase tracking-widest text-xs">Get in touch</p>
                                    <div className="space-y-4">
                                        <a href="mailto:mayanlifestylehospital@gmail.com" className="text-xl md:text-2xl font-bold hover:text-ovicare-primary transition-colors block">mayanlifestylehospital@gmail.com</a>
                                        <a href="tel:254728173181" className="text-lg text-white/60 hover:text-white transition-colors block">0728 173 181</a>
                                    </div>
                                    <div className="flex justify-center md:justify-start space-x-6 pt-4">
                                        {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                                            <Icon key={idx} className="w-5 h-5 cursor-pointer hover:text-ovicare-primary transition-colors" />
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row justify-between items-center gap-4 opacity-40">
                                    <p className="text-[10px] md:text-xs uppercase tracking-widest font-bold">Privacy Policy</p>
                                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest">© {new Date().getFullYear()} Mayan Lifestyle</p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
