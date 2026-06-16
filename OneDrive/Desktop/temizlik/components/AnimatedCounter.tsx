'use client';

import React, { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
    end: number;
    duration?: number; // milisaniye cinsinden animasyon suresi (varsayilan: 2000)
    suffix?: string;
    prefix?: string;
}

export default function AnimatedCounter({ end, duration = 2000, suffix = '', prefix = '' }: AnimatedCounterProps) {
    const [count, setCount] = useState(0);
    const elementRef = useRef<HTMLSpanElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let startTimestamp: number | null = null;
                    
                    const step = (timestamp: number) => {
                        if (!startTimestamp) startTimestamp = timestamp;
                        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                        
                        // easeOutQuad yumusak gecis formulu
                        const easeProgress = progress * (2 - progress);
                        
                        setCount(Math.floor(easeProgress * end));
                        
                        if (progress < 1) {
                            window.requestAnimationFrame(step);
                        } else {
                            setCount(end);
                        }
                    };
                    window.requestAnimationFrame(step);
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [end, duration, hasAnimated]);

    return (
        <span ref={elementRef} style={{ display: 'inline-block' }}>
            {prefix}{count}{suffix}
        </span>
    );
}
