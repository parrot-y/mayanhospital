import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-ovicare-dark text-white pt-20 pb-10 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                {/* Brand */}
                <div className="flex flex-col gap-6">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-ovicare-primary rounded-full flex items-center justify-center">
                            <span className="text-ovicare-dark font-bold text-xl">O</span>
                        </div>
                        <span className="text-white font-bold text-2xl tracking-tight">OviCare</span>
                    </Link>
                    <p className="text-ovicare-text/60 leading-relaxed">
                        Leading the way in medical excellence and innovation. Providing compassionate care and cutting-edge solutions for all your health needs.
                    </p>
                    <div className="flex items-center gap-4">
                        {[Facebook, Twitter, Linkedin, Github].map((Icon, i) => (
                            <button key={i} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-ovicare-primary hover:text-ovicare-dark transition-all">
                                <Icon size={18} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-lg font-bold mb-8 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-1 after:bg-ovicare-primary">Quick Links</h4>
                    <ul className="flex flex-col gap-4">
                        {['Home', 'About Us', 'Our Services', 'Meet The Team', 'Latest News', 'Contact Us'].map(item => (
                            <li key={item}>
                                <Link to="#" className="text-ovicare-text/60 hover:text-ovicare-primary transition-colors flex items-center gap-2">
                                    <span className="text-ovicare-primary">›</span> {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Services */}
                <div>
                    <h4 className="text-lg font-bold mb-8 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-1 after:bg-ovicare-primary">Services</h4>
                    <ul className="flex flex-col gap-4">
                        {['Cardiology', 'Neurology', 'Eye Care', 'Diagnostics', 'Dental Care', 'Pediatrics'].map(item => (
                            <li key={item}>
                                <Link to="#" className="text-ovicare-text/60 hover:text-ovicare-primary transition-colors flex items-center gap-2">
                                    <span className="text-ovicare-primary">›</span> {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-lg font-bold mb-8 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-1 after:bg-ovicare-primary">Contact Info</h4>
                    <ul className="flex flex-col gap-6">
                        <li className="flex items-start gap-4">
                            <MapPin className="text-ovicare-primary shrink-0" size={20} />
                            <span className="text-ovicare-text/60">123 Health Ave, Medical District, NY 12345</span>
                        </li>
                        <li className="flex items-center gap-4">
                            <Phone className="text-ovicare-primary shrink-0" size={20} />
                            <span className="text-ovicare-text/60">0728 173 181</span>
                        </li>
                        <li className="flex items-center gap-4">
                            <Mail className="text-ovicare-primary shrink-0" size={20} />
                            <span className="text-ovicare-text/60">info@ovicare.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-ovicare-text/40">
                <p>© 2026 OviCare Medical. All rights reserved.</p>
                <div className="flex items-center gap-8">
                    <Link to="#" className="hover:text-ovicare-primary transition-colors">Privacy Policy</Link>
                    <Link to="#" className="hover:text-ovicare-primary transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
