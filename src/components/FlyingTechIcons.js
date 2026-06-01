'use client';

import { motion } from 'framer-motion';
import { Code, Database, Server, Smartphone, Monitor, Cpu, Cloud, Globe } from 'lucide-react';
import { useEffect, useState } from 'react';

const icons = [Code, Database, Server, Smartphone, Monitor, Cpu, Cloud, Globe];

export default function FlyingTechIcons() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    // Generate an array of icon configurations
    const flyingIcons = Array.from({ length: 15 }).map((_, i) => {
        const IconComponent = icons[Math.floor(Math.random() * icons.length)];
        return {
            id: i,
            Icon: IconComponent,
            left: `${Math.random() * 100}%`, // Random horizontal start position
            delay: Math.random() * 5, // Random start delay 0-5s
            duration: 15 + Math.random() * 15, // Slow float duration 15-30s
            size: 20 + Math.random() * 30, // Random size
            opacity: 0.05 + Math.random() * 0.15, // Very subtle opacity
            rotation: Math.random() * 360, // Random initial rotation
            rotationEnd: Math.random() * 720 - 360, // Random spin distance
        };
    });

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: 0
        }}>
            {flyingIcons.map((item) => (
                <motion.div
                    key={item.id}
                    initial={{
                        y: "110vh", // Start below the viewport
                        x: 0,
                        opacity: 0,
                        rotate: item.rotation
                    }}
                    animate={{
                        y: "-20vh", // Float up past the top
                        x: (Math.random() - 0.5) * 200, // Drift slightly left or right
                        opacity: [0, item.opacity, item.opacity, 0], // Fade in and out
                        rotate: item.rotation + item.rotationEnd // Spin slowly
                    }}
                    transition={{
                        duration: item.duration,
                        delay: item.delay,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        position: 'absolute',
                        left: item.left,
                        bottom: 0
                    }}
                >
                    <item.Icon size={item.size} color="#A0A0A0" />
                </motion.div>
            ))}
        </div>
    );
}
