import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 24,
                    background: 'transparent',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#00F2FF', // Neon Cyan
                }}
            >
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 12h4M8 10v4M15 13h.01M18 11h.01M10 6H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h6l2-2 2 2h6a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-6l-2 2-2-2Z" />
                </svg>
            </div>
        ),
        {
            ...size,
        }
    );
}
