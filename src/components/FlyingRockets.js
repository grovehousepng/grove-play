'use client';

import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FlyingRockets() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    // Generate an array of rocket configurations
    const rockets = Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 90}%`, // Random horizontal position 0-90%
        delay: Math.random() * 5, // Random start delay 0-5s
        duration: 8 + Math.random() * 7, // Flight duration 8-15s
        size: 24 + Math.random() * 24, // Size 24px - 48px
        opacity: 0.1 + Math.random() * 0.3, // Opacity 0.1 - 0.4
        rotation: -45 + (Math.random() * 20 - 10) // Approx -45 deg, pointing up-rightish
    }));

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
            {rockets.map((rocket) => (
                <motion.div
                    key={rocket.id}
                    initial={{
                        y: 0, // start at bottom
                        x: 0,
                        opacity: 0,
                        rotate: rocket.rotation
                    }}
                    animate={{
                        y: -1000, // Move up 1000px relative to bottom
                        x: 150, // Drift slightly right
                        opacity: [0, 0.8, 0.8, 0], // Peak opacity at 0.8
                    }}
                    transition={{
                        duration: rocket.duration,
                        delay: rocket.delay,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        position: 'absolute',
                        left: rocket.left,
                        bottom: "-50px" // Start a bit below the parent bounds
                    }}
                >
                    <Rocket size={rocket.size} color="#A0A0A0" />
                </motion.div>
            ))}
        </div>
    );
}
