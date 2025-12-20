import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Grove Games - Gaming Unleashed';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 128,
                    background: '#050505',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontFamily: 'sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                    {/* Logo Icon Large */}
                    <svg width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="#00F2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 12h4M8 10v4M15 13h.01M18 11h.01M10 6H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h6l2-2 2 2h6a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-6l-2 2-2-2Z" />
                    </svg>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 30 }}>
                    <span style={{ fontSize: 80, fontWeight: 900, color: '#fff' }}>GROVE</span>
                    <span style={{ fontSize: 80, fontWeight: 900, color: '#00F2FF' }}>PLAY</span>
                </div>

                <div style={{ marginTop: 40, fontSize: 32, color: '#666' }}>Gaming Unleashed</div>
            </div>
        ),
        {
            ...size,
        }
    );
}
