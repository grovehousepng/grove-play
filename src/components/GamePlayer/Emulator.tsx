'use client';

import { useEffect, useRef } from 'react';

interface EmulatorProps {
    gameUrl: string;
    core?: string;
    thumbnailUrl?: string;
    onLoad?: () => void;
}

export default function Emulator({ gameUrl, core = 'segaMD', thumbnailUrl, onLoad }: EmulatorProps) {
    // Construct the internal URL for the isolated emulator page
    // We pass the parameters needed for EJS
    const params = new URLSearchParams();
    if (gameUrl) params.set('url', gameUrl);
    if (core) params.set('core', core);
    if (thumbnailUrl) params.set('thumb', thumbnailUrl);

    return (
        <iframe
            src={`/emu?${params.toString()}`}
            style={{
                width: '100%',
                height: '100%',
                border: 'none',
                display: 'block',
                background: '#000'
            }}
            allow="autoplay; fullscreen; gamepad; accelerometer; gyroscope"
            title="Emulator"
            onLoad={onLoad}
        />
    );
}
