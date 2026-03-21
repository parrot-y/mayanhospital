import React from 'react';
import { servicesData } from '../utils/servicesData';

const items = servicesData.map(s => s.title);

const PlusStar = () => (
    <span className="text-ovicare-dark/30 text-3xl font-black mx-8">•</span>
);

const MarqueeTicker = ({ reverse = false }) => (
    <div className="flex w-full overflow-hidden py-8 bg-vibrant-marquee border-y border-black/5">
        <div
            className="flex items-center"
            style={{
                animation: `marquee${reverse ? 'Reverse' : ''} 60s linear infinite`,
                willChange: 'transform',
                whiteSpace: 'nowrap',
            }}
        >
            {[...items, ...items, ...items, ...items].map((text, i) => (
                <React.Fragment key={i}>
                    <span className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-ovicare-dark">
                        {text}
                    </span>
                    <PlusStar />
                </React.Fragment>
            ))}
        </div>
    </div>
);

export default MarqueeTicker;
