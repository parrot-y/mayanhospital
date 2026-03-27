import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Package, ArrowLeft, ArrowRight, X, Pill } from 'lucide-react';
const ITEMS_PER_PAGE = 20;

const MedicineImage = ({ item, index, availableImagesPool, onZoom }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Precise placeholder logic based on item characteristics
    const getPlaceholder = (name = '') => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('syrup') || lowerName.includes('liquid') || lowerName.includes('suspension')) return 'generic_syrup.webp';
        if (lowerName.includes('caps') || lowerName.includes('cap')) return 'generic_capsules.webp';
        if (lowerName.includes('tabs') || lowerName.includes('tablet')) return 'generic_tablets.webp';
        if (lowerName.includes('ointment') || lowerName.includes('cream') || lowerName.includes('gel')) return 'generic_ointment.webp';
        if (lowerName.includes('spray') || lowerName.includes('nasal') || lowerName.includes('drops')) return 'generic_spray.webp';
        return 'generic_tablets.webp'; // Default
    };

    // Only use official image if it actually exists in the pool
    const imageExists = availableImagesPool && availableImagesPool.includes(item.image);
    const primarySrc = imageExists ? `/assets/medicines/${item.image}` : `/assets/medicines/${getPlaceholder(item.name)}`;
    const placeholderSrc = `/assets/medicines/${getPlaceholder(item.name)}`;

    return (
        <div className="w-full h-full relative">
            {/* Loading Skeleton */}
            <AnimatePresence>
                {!isLoaded && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-white/5 animate-pulse flex flex-col items-center justify-center gap-2"
                    >
                        <Pill className="text-white/10" size={32} />
                        <div className="w-1/2 h-1 bg-white/5 rounded-full" />
                    </motion.div>
                )}
            </AnimatePresence>

            <img
                src={hasError ? placeholderSrc : primarySrc}
                alt={item.name}
                loading="lazy"
                decoding="async"
                onLoad={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
                className={`w-full h-full object-contain filter brightness-[95%] group-hover:brightness-100 transition-all duration-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
            />
        </div>
    );
};

const Medicines = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);
    const [medicinesData, setMedicinesData] = useState([]);
    const [availableImages, setAvailableImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);

        // Fetch large data sets at runtime to prevent Vite OOM
        const fetchData = async () => {
            try {
                const [medRes, imgRes] = await Promise.all([
                    fetch('/data/medicines.json'),
                    fetch('/data/available_images.json')
                ]);
                const medData = await medRes.json();
                const imgData = await imgRes.json();
                setMedicinesData(medData);
                setAvailableImages(imgData);
            } catch (error) {
                console.error('Error loading medicine data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredMedicines = useMemo(() => {
        return medicinesData.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, medicinesData]);

    const totalPages = Math.ceil(filteredMedicines.length / ITEMS_PER_PAGE);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const currentItems = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredMedicines.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredMedicines, currentPage]);

    return (
        <div className="bg-ovicare-dark min-h-screen pt-32 pb-24">
            <div className="container">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ovicare-primary/10 border border-ovicare-primary/20 text-ovicare-primary text-xs font-bold uppercase tracking-[0.2em] mb-6"
                        >
                            <Pill size={14} />
                            Hospital Pharmacy
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-bold text-white uppercase leading-[0.9] tracking-tighter"
                        >
                            Our <span className="text-ovicare-primary italic">Medicines</span>
                        </motion.h1>
                    </div>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative w-full md:w-[400px]"
                    >
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                        <input
                            type="text"
                            placeholder="Search medicines..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-full py-5 pl-14 pr-8 text-white focus:outline-none focus:border-ovicare-primary/50 transition-all placeholder:text-white/20"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                            >
                                <X size={18} />
                            </button>
                        )}
                    </motion.div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-[32px] h-[300px] animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                        <AnimatePresence mode="popLayout">
                            {currentItems.map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                    className="group relative bg-white/5 border border-white/10 rounded-[32px] overflow-hidden hover:border-ovicare-primary/30 transition-all duration-500"
                                >
                                    <div
                                        className="aspect-square p-6 flex items-center justify-center cursor-zoom-in"
                                        onClick={() => setSelectedImage(item)}
                                    >
                                        <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-700">
                                            <MedicineImage
                                                item={item}
                                                index={medicinesData.indexOf(item)}
                                                availableImagesPool={availableImages}
                                                onZoom={() => setSelectedImage(item)}
                                            />
                                        </div>
                                    </div>
                                    <div className="p-6 pt-0">
                                        <div className="h-px w-8 bg-ovicare-primary/30 mb-4 group-hover:w-full transition-all duration-700" />
                                        <h3 className="text-white font-bold text-[11px] md:text-base uppercase tracking-tight line-clamp-3 md:line-clamp-2 leading-tight group-hover:text-ovicare-primary transition-colors min-h-[2.5rem] md:min-h-0">
                                            {item.name}
                                        </h3>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {/* Empty State */}
                {!loading && filteredMedicines.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-32 text-center"
                    >
                        <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6 text-white/20">
                            <Package size={48} />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">No medicines found</h2>
                        <p className="text-white/40">Try searching for a different product name.</p>
                    </motion.div>
                )}

                {/* Pagination */}
                {!loading && totalPages > 1 && (
                    <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-8 border-t border-white/5 pt-12">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-ovicare-primary hover:text-ovicare-dark disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white transition-all group"
                            >
                                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            </button>

                            <div className="flex items-center gap-2 px-2">
                                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) pageNum = i + 1;
                                    else if (currentPage <= 3) pageNum = i + 1;
                                    else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                                    else pageNum = currentPage - 2 + i;

                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={`w-12 h-12 rounded-full font-bold text-sm transition-all ${currentPage === pageNum
                                                ? 'bg-ovicare-primary text-ovicare-dark'
                                                : 'text-white/40 hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-ovicare-primary hover:text-ovicare-dark disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white transition-all group"
                            >
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        <div className="text-white/40 font-bold uppercase tracking-widest text-[10px]">
                            Page <span className="text-white">{currentPage}</span> of {totalPages} — {filteredMedicines.length} medicine{filteredMedicines.length !== 1 ? 's' : ''}
                        </div>
                    </div>
                )}
            </div>

            {/* Image Overlay */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 bg-ovicare-dark/95 backdrop-blur-xl z-[100] p-6 flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="max-w-4xl w-full flex flex-col items-center gap-8"
                        >
                            <div className="relative w-full aspect-square md:aspect-video rounded-[40px] overflow-hidden border border-white/10 bg-white/5 shadow-2xl">
                                <MedicineImage
                                    item={selectedImage}
                                    index={medicinesData.indexOf(selectedImage)}
                                    availableImagesPool={availableImages}
                                />
                                <button
                                    onClick={() => setSelectedImage(null)}
                                    className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-ovicare-primary hover:text-ovicare-dark transition-all flex items-center justify-center text-white z-10"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="text-center space-y-2">
                                <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter">{selectedImage.name}</h2>
                                <p className="text-ovicare-primary italic font-medium uppercase tracking-widest text-sm">Product SKU Verification Required</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Medicines;
