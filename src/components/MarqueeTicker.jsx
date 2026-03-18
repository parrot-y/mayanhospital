import React from 'react';

const items = [
    'Cardiologist', 'Plasma cell', 'Transplant', 'Inpatient care',
    'Cardiologist', 'Plasma cell', 'Transplant', 'Inpatient care',
];

const PlusStar = () => (
    <img
        src="https://cdn.prod.website-files.com/65c9db2ebeedf24f0e4dec0b/65ca12c4278110ddde5541ea_icon-3.webp"
        alt="*"
        className="w-6 h-6 mx-6 object-contain flex-shrink-0"
        loading="lazy"
    />
);

const MarqueeTicker = ({ reverse = false }) => (
    <div className="flex w-full overflow-hidden border-y border-white/10 py-5 bg-ovicare-dark/50">
        <div
            className="flex items-center"
            style={{
                animation: `marquee${reverse ? 'Reverse' : ''} 30s linear infinite`,
                willChange: 'transform',
                whiteSpace: 'nowrap',
            }}
        >
            {[...items, ...items, ...items].map((text, i) => (
                <React.Fragment key={i}>
                    <span className="text-xl md:text-2xl font-bold uppercase tracking-widest text-white/80">
                        {text}
                    </span>
                    <PlusStar />
                </React.Fragment>
            ))}
        </div>
    </div>
);

export default MarqueeTicker;
