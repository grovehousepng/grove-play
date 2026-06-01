'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const LiquidBackground = dynamic(() => import('./LiquidBackground'), { ssr: false });
const InteractiveBackground = dynamic(() => import('./InteractiveBackground'), { ssr: false });
const FloatingCTA = dynamic(() => import('./FloatingCTA'), { ssr: false });
const GiveawayWidget = dynamic(() => import('./GiveawayWidget'), { ssr: false });

export default function ClientWidgets() {
    const [renderWidgets, setRenderWidgets] = useState(false);

    useEffect(() => {
        // Delay mounting of heavy canvas/animation widgets to unblock the main thread
        // during initial render, improving LCP/TBT and fixing iOS scroll resistance.
        const timer = setTimeout(() => {
            setRenderWidgets(true);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    if (!renderWidgets) return null;

    return (
        <>
            <LiquidBackground />
            <InteractiveBackground />
            {/* <GiveawayWidget /> */}
            <FloatingCTA />
        </>
    );
}
