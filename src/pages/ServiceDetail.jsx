import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Calendar, Phone, Mail, MapPin, Pill, UserRound, FlaskConical, Bed, Accessibility, Baby, Activity, Droplet, Heart, Scale, Apple, Sparkles, Scan } from 'lucide-react';
import { servicesData } from '../utils/servicesData';

const iconMap = {
    Pill, UserRound, FlaskConical, Bed, Accessibility, Baby, Activity, Droplet, Heart, Scale, Apple, Sparkles, Scan
};

const ImageCarousel = ({ images, title }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className="relative w-full aspect-[4/5] md:aspect-[16/7] rounded-[20px] md:rounded-[40px] overflow-hidden group border border-white/5 bg-ovicare-dark/30">
            <AnimatePresence mode="wait">
                <motion.img
                    key={current}
                    src={images[current]}
                    alt={`${title} ${current + 1}`}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[90%] group-hover:scale-105 transition-transform duration-1000"
                />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-ovicare-dark/60 via-transparent to-transparent pointer-events-none" />
        </div>
    );
};


const ServiceDetail = () => {
    const { serviceId } = useParams();
    const navigate = useNavigate();
    const service = servicesData.find(s => s.id === serviceId);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!service) {
            navigate('/services');
        }
    }, [service, navigate]);

    if (!service) return null;

    const Icon = iconMap[service.icon] || Heart;
    // Support both old `image` string and new `images` array
    const images = service.images || (service.image ? [service.image] : []);

    return (
        <div className="bg-ovicare-dark min-h-screen pt-32 pb-20">
            <div className="container">
                {/* Back Button */}
                <Link
                    to="/services"
                    className="inline-flex items-center gap-2 text-white/50 hover:text-ovicare-primary transition-colors mb-12 group uppercase tracking-widest font-bold text-sm"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Services
                </Link>

                <div className="grid lg:grid-cols-12 gap-16">
                    {/* Left Column - Content */}
                    <div className="lg:col-span-7 space-y-12">
                        <header className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-20 h-20 rounded-3xl bg-ovicare-primary/10 flex items-center justify-center text-ovicare-primary"
                            >
                                <Icon size={40} />
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-5xl md:text-7xl font-bold text-white uppercase leading-[0.9]"
                            >
                                {service.title}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-xl text-white/60 leading-relaxed max-w-2xl"
                            >
                                {service.shortDesc}
                            </motion.p>
                        </header>

                        {/* Image Banner / Carousel */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <ImageCarousel images={images} title={service.title} />
                        </motion.div>

                        {/* Full Description */}
                        <section className="space-y-6">
                            <h2 className="text-3xl font-bold text-white uppercase tracking-tight">Overview</h2>
                            <p className="text-white/70 text-lg leading-relaxed">
                                {service.fullDesc}
                            </p>
                        </section>

                        {/* Benefits */}
                        <section className="space-y-8 bg-white/5 border border-white/10 rounded-[40px] p-10">
                            <h2 className="text-3xl font-bold text-white uppercase tracking-tight">Why Choose Our {service.title}?</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {service.benefits.map((benefit, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <div className="mt-1 bg-ovicare-primary/20 p-1.5 rounded-full text-ovicare-primary">
                                            <CheckCircle2 size={18} />
                                        </div>
                                        <span className="text-white/80 font-medium">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column - Sidebar */}
                    <aside className="lg:col-span-5 space-y-8">
                        {/* Appointment Card */}
                        <div className="bg-ovicare-primary rounded-[50px] p-12 text-ovicare-dark sticky top-32">
                            <h3 className="text-4xl font-black uppercase leading-[0.9] mb-6">
                                Ready to <br />Book an <br />Appointment?
                            </h3>
                            <p className="font-medium text-lg mb-10 opacity-80">
                                Schedule your visit today and experience premium healthcare services tailored for your well-being.
                            </p>

                            <div className="space-y-4 mb-10">
                                <div className="flex items-center gap-4 bg-black/5 p-4 rounded-2xl">
                                    <Phone size={24} />
                                    <span className="font-bold text-xl">0728 173 181</span>
                                </div>
                                <div className="flex items-center gap-4 bg-black/5 p-4 rounded-2xl">
                                    <Calendar size={24} />
                                    <span className="font-bold">Mon - Sun (24/7)</span>
                                </div>
                            </div>

                            <Link
                                to="/appointment"
                                className="block w-full bg-ovicare-dark text-white text-center py-6 rounded-2xl font-bold uppercase tracking-widest hover:bg-white hover:text-ovicare-dark transition-all transform hover:scale-[1.02]"
                            >
                                Book Appointment!
                            </Link>
                        </div>

                        {/* Other Info */}
                        <div className="bg-white/5 border border-white/10 rounded-[40px] p-10 space-y-8">
                            <h4 className="text-xl font-bold text-white uppercase tracking-widest">Contact Information</h4>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <MapPin className="text-ovicare-primary flex-shrink-0" size={24} />
                                    <div>
                                        <div className="text-white font-bold">Location</div>
                                        <div className="text-white/60">Mayan Lifestyle Hospital, Kiambu, Kenya</div>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Mail className="text-ovicare-primary flex-shrink-0" size={24} />
                                    <div>
                                        <div className="text-white font-bold">Email</div>
                                        <div className="text-white/60">mayanlifestylehospital@gmail.com</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;
