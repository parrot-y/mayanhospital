import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-ovicare-dark text-white border-t border-white/5 pt-20">
            <div className="container">
                {/* Top Footer */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-20 border-b border-white/5">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <h3 className="text-xl font-bold uppercase tracking-tight">Contact info</h3>
                        <address className="not-italic space-y-4 text-white/60">
                            <p>752 New South Head Rd, Triple Bay <br />SWFW 3148, New York</p>
                            <a href="tel:+17891234567" className="block text-white font-bold hover:text-ovicare-primary transition-colors">+1(789) -123-4567</a>
                            <a href="mailto:info@example.com" className="block text-white font-bold hover:text-ovicare-primary transition-colors">info@example.com</a>
                        </address>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-8">
                        <h3 className="text-xl font-bold uppercase tracking-tight">Pages</h3>
                        <ul className="space-y-4">
                            {['Home', 'Our doctor', 'Blog', 'Appointment'].map((link) => (
                                <li key={link}>
                                    <Link to="/" className="text-white/60 font-bold uppercase tracking-widest text-xs hover:text-ovicare-primary transition-colors">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social */}
                    <div className="space-y-8">
                        <h3 className="text-xl font-bold uppercase tracking-tight">Social</h3>
                        <div className="flex flex-col space-y-4">
                            {[
                                { name: 'Facebook', Icon: Facebook },
                                { name: 'Twitter', Icon: Twitter },
                                { name: 'Instagram', Icon: Instagram },
                                { name: 'Linkedin', Icon: Linkedin },
                            ].map(({ name, Icon }) => (
                                <a key={name} href="#" className="flex items-center gap-3 text-white/60 font-bold uppercase tracking-widest text-xs hover:text-ovicare-primary transition-colors">
                                    <Icon className="w-4 h-4" />
                                    {name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Subscribe */}
                    <div className="space-y-8">
                        <h3 className="text-xl font-bold uppercase tracking-tight">Subscribe to news</h3>
                        <div className="space-y-4">
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 focus:outline-none focus:border-ovicare-primary transition-colors"
                            />
                            <button className="w-full bg-ovicare-primary text-ovicare-dark font-bold uppercase tracking-widest text-xs py-4 rounded-full hover:bg-white transition-all">
                                Submit now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Center Footer */}
                <div className="py-12 flex flex-col lg:flex-row items-center justify-between gap-12 border-b border-white/5">
                    <Link to="/">
                        <img
                            src="https://cdn.prod.website-files.com/65c9db2ebeedf24f0e4dec0b/65f2f13fe0b6741ccd3a6265_footer-logo.webp"
                            alt="OviCare"
                            className="h-16 md:h-24 object-contain"
                        />
                    </Link>

                    <div className="bg-white/5 p-8 md:p-12 rounded-[40px] border border-white/5 max-w-lg">
                        <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">Book an Appointment</h3>
                        <p className="text-white/60 mb-6">Secure your medical appointment conveniently expert care at your convenience.</p>
                        <div className="flex items-center gap-2">
                            <span className="text-white/40 font-bold uppercase tracking-widest text-xs">Call -</span>
                            <a href="tel:+17891234567" className="text-xl font-bold text-ovicare-primary">+1(789) -123-4567</a>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                    <div className="flex items-center gap-4">
                        <p>© 2024. <Link to="/" className="text-white/60 hover:text-ovicare-primary transition-colors">Ovicare</Link> medical template</p>
                        <div className="w-1 h-1 bg-white/20 rounded-full" />
                        <p>Powered by <a href="#" className="text-white/60 hover:text-ovicare-primary transition-colors">Webflow</a></p>
                    </div>
                    <p>More templates by <a href="#" className="text-white/60 hover:text-ovicare-primary transition-colors">Themetechmount</a></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
