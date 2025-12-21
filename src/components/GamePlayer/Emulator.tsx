'use client';

import { useEffect, useRef } from 'react';

interface EmulatorProps {
    gameUrl: string;
    core?: string;
    thumbnailUrl?: string;
}

export default function Emulator({ gameUrl, core = 'segaMD', thumbnailUrl }: EmulatorProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!gameUrl) return;

        // Clean up previous instance if any (though typically React handles remounts)
        const container = containerRef.current;
        if (container) {
            container.innerHTML = '';
        }

        // Configure EJS_player global object
        // We use window as any to bypass TS checks for globals
        (window as any).EJS_player = '#game';
        (window as any).EJS_core = core; // e.g. 'segaMD', 'nes', 'gba'
        (window as any).EJS_gameUrl = gameUrl;
        (window as any).EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/';

        // Optional configuration
        (window as any).EJS_startOnLoaded = true;
        (window as any).EJS_backgroundColor = '#000000';

        if (thumbnailUrl) {
            (window as any).EJS_backgroundImage = thumbnailUrl;
        }

        // Load the script
        const script = document.createElement('script');
        script.src = 'https://cdn.emulatorjs.org/stable/data/loader.js';
        script.async = true;

        if (container) {
            // Create the game div required by EmulatorJS
            const gameDiv = document.createElement('div');
            gameDiv.id = 'game';
            gameDiv.style.width = '100%';
            gameDiv.style.height = '100%';
            container.appendChild(gameDiv);
            container.appendChild(script);
        }

        return () => {
            // Cleanup: Remove script and globals to prevent leakage
            if (containerReference) {
                containerReference.innerHTML = '';
            }
            // Cleaning up globals is tricky as the lib might persist, 
            // but removing the DOM element stops the loop.
        };
    }, [gameUrl, core, thumbnailUrl]);

    // Keep a stable ref for cleanup
    const containerReference = containerRef.current;

    return (
        <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
            {/* Emulator will be injected here */}
        </div>
    );
}
