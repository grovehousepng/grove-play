'use client';

import { motion } from 'framer-motion';
import { useLayoutEffect, useState, useEffect } from 'react';

export default function FallingItems({ icon: Icon, count = 15, containerClassName = "" }) {
    const [items, setItems] = useState([]);

    // Use standard useEffect to avoid hydration mismatches, 
    // but we can just render nothing on server.
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const newItems = Array.from({ length: count }).map((_, i) => ({
            id: i,
            left: Math.random() * 100, // percentage
            delay: Math.random() * 5,
            duration: 8 + Math.random() * 7,
            size: 24 + Math.random() * 24, // 24px to 48px
            rotate: Math.random() * 360,
        }));
        setItems(newItems);
    }, [count]);

    if (!mounted || !Icon) return null;

    return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden ${containerClassName}`} style={{ zIndex: 0 }}>
            {items.map((item) => (
                <motion.div
                    key={item.id}
                    className="absolute top-[-60px]"
                    style={{
                        left: `${item.left}%`,
                        opacity: 0.15, // Low opacity for subtle effect
                        color: 'currentColor'
                    }}
                    animate={{
                        y: ['0vh', '1000px'], // Fall down 1000px roughly covers the section
                        rotate: [0, item.rotate + 360],
                    }}
                    transition={{
                        duration: item.duration,
                        repeat: Infinity,
                        delay: item.delay,
                        ease: "linear",
                    }}
                >
                    <Icon size={item.size} strokeWidth={1.5} />
                </motion.div>
            ))}
        </div>
    );
}
