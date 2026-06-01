'use client';

import { motion } from 'framer-motion';

export default function WaveTransition({ color = '#000000', position = 'top', reversed = false }) {
    // We double the path horizontally to create a seamless loop
    // 0-100: M0 40 Q 25 10 50 40 T 100 40
    // 100-200: T 150 40 T 200 40
    // V 120 H 0 Z closes it
    const path = "M0 40 Q 25 10 50 40 T 100 40 T 150 40 T 200 40 V 120 H 0 Z";

    return (
        <div
            style={{
                width: '100%',
                height: '102px',
                position: 'relative',
                background: 'transparent',
                overflow: 'hidden',
                marginTop: position === 'top' ? '-101px' : '-1px',
                marginBottom: position === 'bottom' ? '-101px' : '-1px',
                zIndex: 5,
                transform: reversed ? 'scaleY(-1)' : 'none',
                pointerEvents: 'none',
                userSelect: 'none',
                backfaceVisibility: 'hidden',
                WebkitFontSmoothing: 'antialiased'
            }}
        >
            <motion.div
                style={{
                    width: '200%', // 2x width
                    height: '100%',
                    display: 'flex'
                }}
                animate={{
                    x: ['0%', '-50%'] // Move left by 50% (of total width), which is 100% of container width
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                <svg
                    viewBox="0 0 200 120"
                    preserveAspectRatio="none"
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'block',
                    }}
                >
                    <path
                        d={path}
                        fill={color}
                        stroke={color}
                        strokeWidth="1"
                    />
                </svg>
            </motion.div>
        </div>
    );
}
