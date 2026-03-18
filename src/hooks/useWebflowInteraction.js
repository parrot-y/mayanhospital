import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook to simulate Webflow's interaction engine behavior.
 * Uses IntersectionObserver with a specific threshold and staggered delays.
 */
export const useWebflowInteraction = (options = {}) => {
    const {
        threshold = 0.28,
        rootMargin = '0px',
        stagger = 100,
        delay = 0,
        once = true
    } = options;

    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, delay);
                    if (once && ref.current) {
                        observer.unobserve(ref.current);
                    }
                } else if (!once) {
                    setIsVisible(false);
                }
            },
            { threshold, rootMargin }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [threshold, rootMargin, delay, once]);

    const getStaggerDelay = (index) => ({
        transition: {
            delay: (delay + index * stagger) / 1000,
            duration: 0.8,
            ease: [0.25, 0.8, 0.25, 1],
        }
    });

    return { ref, isVisible, getStaggerDelay };
};

export const webflowVariants = {
    hidden: {
        opacity: 0,
        y: 32,
    },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.8,
            ease: [0.25, 0.8, 0.25, 1],
        },
    }),
};
