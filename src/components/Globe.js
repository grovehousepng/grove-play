'use client';

import { useEffect, useRef, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import countriesData from '../data/countries.json';

// Dynamically import Globe to avoid SSR issues
const ReactGlobe = dynamic(() => import('react-globe.gl'), {
    ssr: false,
    loading: () => (
        <div style={{ width: '100%', height: '480px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 60, height: 60, border: '3px solid #eee', borderTop: '3px solid #000', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        </div>
    ),
});

// Fixed globe size — prevents ResizeObserver zoom-loop
const GLOBE_SIZE = 480;

export default function GlobeComponent() {
    const globeRef = useRef();
    const wrapperRef = useRef();
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    // Disable scroll-capture & zoom on the Three.js canvas once it mounts
    useEffect(() => {
        if (!wrapperRef.current) return;

        const el = wrapperRef.current;

        // Block wheel events from reaching Three.js OrbitControls
        const blockWheel = (e) => { e.stopPropagation(); };

        // Block all touch events – page will still scroll normally
        const blockTouch = (e) => { e.stopPropagation(); };

        el.addEventListener('wheel', blockWheel, { passive: true });
        el.addEventListener('touchstart', blockTouch, { passive: true });
        el.addEventListener('touchmove', blockTouch, { passive: true });

        return () => {
            el.removeEventListener('wheel', blockWheel);
            el.removeEventListener('touchstart', blockTouch);
            el.removeEventListener('touchmove', blockTouch);
        };
    }, [mounted]);

    // Auto-rotate — disable zoom & pan
    useEffect(() => {
        if (!globeRef.current) return;
        const controls = globeRef.current.controls();
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.0;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.enableRotate = false; // purely decorative – no manual drag
    }, [mounted]);

    const gData = useMemo(() =>
        [...Array(15)].map(() => ({
            lat: (Math.random() - 0.5) * 180,
            lng: (Math.random() - 0.5) * 360,
            size: Math.random() / 2 + 0.1,
            color: ['#000000', '#222222', '#555555'][Math.round(Math.random() * 2)],
        })), []);

    const arcsData = useMemo(() =>
        [...Array(8)].map(() => ({
            startLat: (Math.random() - 0.5) * 180,
            startLng: (Math.random() - 0.5) * 360,
            endLat: (Math.random() - 0.5) * 180,
            endLng: (Math.random() - 0.5) * 360,
            color: ['rgba(0,0,0,0.4)', 'rgba(50,50,50,0.2)'],
        })), []);

    const whiteTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=";

    return (
        /* pointer-events:none on outer wrapper → scroll/pinch pass through to page */
        <div
            style={{
                width: GLOBE_SIZE,
                height: GLOBE_SIZE,
                pointerEvents: 'none',   // ← key fix: touch/wheel pass through
                userSelect: 'none',
                willChange: 'transform', // GPU compositing hint
                contain: 'strict',       // layout isolation for perf
            }}
        >
            {/* inner wrapper captures only the events we want to block */}
            <div ref={wrapperRef} style={{ width: '100%', height: '100%' }}>
                {mounted && (
                    <ReactGlobe
                        ref={globeRef}
                        width={GLOBE_SIZE}
                        height={GLOBE_SIZE}
                        globeImageUrl={whiteTexture}
                        backgroundColor="rgba(0,0,0,0)"
                        showAtmosphere={true}
                        atmosphereColor="#aaaaaa"
                        atmosphereAltitude={0.15}
                        polygonsData={countriesData.features}
                        polygonCapColor={() => '#000000'}
                        polygonSideColor={() => '#111111'}
                        polygonStrokeColor={() => '#222222'}
                        polygonAltitude={0.01}
                        pointsData={gData}
                        pointColor="color"
                        pointAltitude={0.03}
                        pointRadius="size"
                        pointsMerge={true}
                        arcsData={arcsData}
                        arcColor="color"
                        arcDashLength={0.4}
                        arcDashGap={0.2}
                        arcDashAnimateTime={2000}
                        arcAltitudeAutoScale={0.3}
                        arcStroke={1}
                        enableZoom={false}
                    />
                )}
            </div>
        </div>
    );
}

