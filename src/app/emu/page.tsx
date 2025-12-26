'use client';

import { useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

function EmulatorRunner() {
    const searchParams = useSearchParams();
    const gameUrl = searchParams.get('url');
    const core = searchParams.get('core') || 'segaMD';
    const thumb = searchParams.get('thumb') || '';

    // We use a ref to ensure we only initialize once per load
    const initialized = useRef(false);

    useEffect(() => {
        if (!gameUrl || initialized.current) return;
        initialized.current = true;

        const win = window as any;

        // Settings
        win.EJS_player = '#game';
        win.EJS_core = core;
        win.EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/';
        win.EJS_startOnLoaded = true;
        win.EJS_backgroundColor = '#000000';
        win.EJS_language = 'en-US'; // Prevent missing lang file 404s

        // Determine final Game URL
        const origin = window.location.origin;

        // If it's a local path (e.g. /roms/game.md), serve directly. 
        // Otherwise use proxy.
        if (gameUrl && gameUrl.startsWith('/')) {
            win.EJS_gameUrl = `${origin}${gameUrl}`;
        } else {
            win.EJS_gameUrl = `${origin}/api/proxy-rom?url=${encodeURIComponent(gameUrl || '')}`;
        }

        if (thumb) {
            win.EJS_backgroundImage = thumb;
        }

        // Load Script
        const script = document.createElement('script');
        script.src = 'https://cdn.emulatorjs.org/stable/data/loader.js';
        script.async = true;
        document.body.appendChild(script);

    }, [gameUrl, core, thumb]);

    return (
        <div id="game" style={{ width: '100vw', height: '100vh', background: 'black', margin: 0, padding: 0, overflow: 'hidden' }}></div>
    );
}

// Disable SSR for this page entirely to prevent hydration mismatches
const EmulatorRunnerNoSSR = dynamic(() => Promise.resolve(EmulatorRunner), {
    ssr: false
});

export default function EmuPage() {
    return (
        <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
            <EmulatorRunnerNoSSR />
        </Suspense>
    );
}
