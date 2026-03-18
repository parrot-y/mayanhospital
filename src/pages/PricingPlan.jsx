import React from 'react';
import { motion } from 'framer-motion';
import { Check, Plus } from 'lucide-react';
import Footer from '../components/FooterRefined';
import MarqueeTicker from '../components/MarqueeTicker';
import { useWebflowInteraction, webflowVariants } from '../hooks/useWebflowInteraction';

const PricingPlan = () => {
    const { ref, isVisible } = useWebflowInteraction({ threshold: 0.1 });

    const packages = [
        {
            title: "Blood test",
            price: "$199",
            desc: "Explore our advanced blood tests for precise health insights. Our expert analysis guides personalized treatment.",
            features: ["Complete Blood Count", "Cholesterol Levels", "Glucose Monitoring", "Vitamin Profile"]
        },
        {
            title: "Heart check up",
            price: "$399",
            desc: "Prioritize your heart health with our comprehensive check-up. Advanced diagnostics and expert analysis.",
            features: ["ECG / EKG", "Stress Test", "Blood Pressure Check", "Cardiologist Consult"]
        },
        {
            title: "Regular consultation",
            price: "$99",
            desc: "Consistent check-ups foster proactive health. Our regular consultations offer personalized care.",
            features: ["General Health Check", "Preventive Care", "Health Advisory", "Basic Diagnostics"]
        }
    ];

    const faqs = [
        "How do I book an appointment?",
        "What medical insurance do you accept?",
        "Are online consultations available?",
        "How can I access my medical records?"
    ];

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
                        Pack<span className="text-ovicare-primary italic">ages</span>
                    </motion.h1>
                    <motion.p
                        initial="hidden"
                        animate="visible"
                        custom={1}
                        variants={webflowVariants}
                        className="text-xl text-ovicare-text/60 max-w-2xl"
                    >
                        Choose the right healthcare package for your needs. We offer transparent pricing and comprehensive medical solutions.
                    </motion.p>
                </div>
            </div>

            {/* Packages Grid */}
            <section ref={ref} className="py-24 container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {packages.map((pkg, i) => (
                        <motion.div
                            key={i}
                            initial="hidden"
                            animate={isVisible ? "visible" : "hidden"}
                            custom={i}
                            variants={webflowVariants}
                            className="bg-white/5 border border-white/10 p-10 rounded-[40px] flex flex-col justify-between group hover:border-ovicare-primary/30 transition-all"
                        >
                            <div className="space-y-8">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{pkg.title}</h3>
                                    <div className="text-3xl font-bold text-ovicare-primary italic">{pkg.price}</div>
                                </div>
                                <p className="text-white/60 leading-relaxed">{pkg.desc}</p>
                                <ul className="space-y-4">
                                    {pkg.features.map((feat, j) => (
                                        <li key={j} className="flex items-center gap-3 text-white/80 font-bold uppercase tracking-widest text-[10px]">
                                            <div className="w-5 h-5 bg-ovicare-primary/10 rounded-full flex items-center justify-center text-ovicare-primary">
                                                <Check size={12} />
                                            </div>
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button className="mt-12 w-full bg-ovicare-primary text-ovicare-dark py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white transition-all transform hover:scale-[1.02]">
                                Get Appointment
                            </button>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Clinic Stats / Info */}
            <section className="py-24 bg-white/5 border-y border-white/10">
                <div className="container text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight max-w-4xl mx-auto leading-tight">
                        <span className="text-ovicare-primary italic">15,000+</span> Our clinic has grown to provide world class facility for clinic dentistry.
                    </h2>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 container">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                    <div className="md:max-w-md space-y-6">
                        <h2 className="text-4xl font-bold text-white uppercase tracking-tight">Frequently asked questions</h2>
                        <p className="text-white/60">Can't find your answer? Our support team is available 24/7 to help you with any queries.</p>
                        <a href="/contact" className="inline-block text-ovicare-primary font-bold uppercase tracking-widest text-xs border-b border-ovicare-primary pb-1">Contact Us</a>
                    </div>
                    <div className="flex-1 w-full space-y-4">
                        {faqs.map((faq, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                                className="bg-white/5 border border-white/10 p-8 rounded-3xl flex items-center justify-between group cursor-pointer"
                            >
                                <span className="text-white font-bold text-lg">{faq}</span>
                                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-ovicare-primary transition-colors">
                                    <Plus className="text-white group-hover:text-ovicare-dark transition-colors" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <MarqueeTicker />
            <Footer />
        </div>
    );
};

export default PricingPlan;
