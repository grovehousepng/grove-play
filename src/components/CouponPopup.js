'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

export default function CouponPopup({ isOpen, onClose }) {
    const [isTearing, setIsTearing] = useState(false);
    const [isTorn, setIsTorn] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const ticketRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        if (isOpen) {
            setIsTearing(false);
            setIsTorn(false);
        }
    }, [isOpen]);

    const handleMouseMove = (e) => {
        if (!ticketRef.current || isTearing) return;
        const rect = ticketRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePos({ x: x * 12, y: y * -12 });
    };

    const handleMouseLeave = () => {
        setMousePos({ x: 0, y: 0 });
    };

    const handleTear = () => {
        if (isTearing || isTorn) return;
        setIsTearing(true);

        setTimeout(() => {
            setIsTorn(true);
        }, 600);

        setTimeout(() => {
            onClose();
            router.push('/fiyatlandirma');
        }, 1100);
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[99999] flex items-center justify-center"
            onClick={onClose}
        >
            <style>{`
                @keyframes coupon-enter {
                    from { opacity: 0; transform: scale(0.8) rotate(-3deg); }
                    to { opacity: 1; transform: scale(1) rotate(0deg); }
                }
                @keyframes tear-left {
                    0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
                    100% { transform: translate(-100px, 60px) rotate(-12deg); opacity: 0; }
                }
                @keyframes tear-right {
                    0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
                    100% { transform: translate(100px, 60px) rotate(12deg); opacity: 0; }
                }
                @keyframes subtle-float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-6px); }
                }

                /* Scalloped edge masks */
                .ticket-body {
                    position: relative;
                    background: #faf6f0;
                }
                .ticket-body::before,
                .ticket-body::after {
                    content: '';
                    position: absolute;
                    left: 0; right: 0;
                    height: 16px;
                    background-image: radial-gradient(circle at 12px 0, transparent 10px, #faf6f0 10px);
                    background-size: 24px 16px;
                    background-repeat: repeat-x;
                }
                .ticket-body::before {
                    top: -16px;
                    background-position: -12px 0;
                }
                .ticket-body::after {
                    bottom: -16px;
                    transform: rotate(180deg);
                    background-position: -12px 0;
                }

                .ticket-side-text {
                    writing-mode: vertical-rl;
                    text-orientation: mixed;
                    font-size: 9px;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                    color: rgba(0,0,0,0.2);
                    font-family: monospace;
                }
            `}</style>

            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

            {/* Close */}
            <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="absolute top-6 right-6 text-white/60 hover:text-white z-[100000] bg-transparent border-none cursor-pointer transition-colors"
            >
                <X size={28} />
            </button>

            {/* Ticket */}
            {!isTorn && (
                <div
                    onClick={(e) => { e.stopPropagation(); handleTear(); }}
                    className="relative cursor-pointer"
                    style={{
                        perspective: '800px',
                        animation: !isTearing ? 'coupon-enter 0.5s ease-out, subtle-float 4s ease-in-out 0.5s infinite' : undefined,
                    }}
                >
                    <div
                        ref={ticketRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        className="flex"
                        style={{
                            transform: `rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)`,
                            transition: isTearing ? 'none' : 'transform 0.15s ease-out',
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        {/* LEFT HALF */}
                        <div style={{ animation: isTearing ? 'tear-left 0.6s ease-in forwards' : undefined }}>
                            <div
                                className="ticket-body"
                                style={{
                                    width: 'clamp(200px, 45vw, 280px)',
                                    minHeight: 'clamp(220px, 35vh, 300px)',
                                    borderRadius: '12px 0 0 12px',
                                    borderRight: '2px dashed rgba(0,0,0,0.12)',
                                    padding: '36px 20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                                }}
                            >
                                {/* Top border line */}
                                <div style={{
                                    position: 'absolute', top: '12px', left: '12px', right: '12px', bottom: '12px',
                                    border: '1.5px solid rgba(0,0,0,0.08)',
                                    borderRadius: '6px 0 0 6px',
                                    borderRight: 'none',
                                    pointerEvents: 'none',
                                }} />

                                {/* Top label */}
                                <div style={{
                                    fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase',
                                    color: 'rgba(0,0,0,0.3)', fontFamily: 'monospace', textAlign: 'center',
                                }}>
                                    Bilet • Grove Media Creative
                                </div>

                                {/* Side text left */}
                                <div className="ticket-side-text" style={{
                                    position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%) rotate(180deg)',
                                }}>
                                    0000001 · Tıkla
                                </div>

                                {/* Center content */}
                                <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <div style={{
                                        fontSize: 'clamp(28px, 5vw, 38px)', fontWeight: 'bold',
                                        letterSpacing: '4px', color: '#0a0a0a',
                                        fontFamily: 'var(--font-bebas), sans-serif',
                                        lineHeight: 1,
                                    }}>
                                        GROVE
                                    </div>
                                    <div style={{
                                        fontSize: 'clamp(24px, 4vw, 34px)',
                                        letterSpacing: '4px',
                                        color: '#0a0a0a',
                                        fontWeight: 'bold',
                                        marginTop: '2px',
                                        fontFamily: 'var(--font-bebas), sans-serif',
                                        lineHeight: 1,
                                    }}>
                                        TICKET
                                    </div>
                                </div>

                                {/* Bottom label */}
                                <div style={{
                                    fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase',
                                    color: 'rgba(0,0,0,0.25)', fontFamily: 'monospace', textAlign: 'center',
                                    transform: 'rotate(180deg)',
                                }}>
                                    Bilet • Grove Media
                                </div>

                                {/* Notches */}
                                <div style={{ position: 'absolute', top: '-10px', right: '-11px', width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(0,0,0,0.85)' }} />
                                <div style={{ position: 'absolute', bottom: '-10px', right: '-11px', width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(0,0,0,0.85)' }} />
                            </div>
                        </div>

                        {/* RIGHT HALF */}
                        <div style={{ animation: isTearing ? 'tear-right 0.6s ease-in forwards' : undefined }}>
                            <div
                                className="ticket-body"
                                style={{
                                    width: 'clamp(200px, 45vw, 280px)',
                                    minHeight: 'clamp(220px, 35vh, 300px)',
                                    borderRadius: '0 12px 12px 0',
                                    padding: '36px 20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                                }}
                            >
                                {/* Inner border */}
                                <div style={{
                                    position: 'absolute', top: '12px', left: '12px', right: '12px', bottom: '12px',
                                    border: '1.5px solid rgba(0,0,0,0.08)',
                                    borderRadius: '0 6px 6px 0',
                                    borderLeft: 'none',
                                    pointerEvents: 'none',
                                }} />

                                {/* Top label */}
                                <div style={{
                                    fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase',
                                    color: 'rgba(0,0,0,0.3)', fontFamily: 'monospace', textAlign: 'center',
                                }}>
                                    Fiyatları Gör
                                </div>

                                {/* Side text right */}
                                <div className="ticket-side-text" style={{
                                    position: 'absolute', right: '18px', top: '50%', transform: 'translateY(-50%)',
                                }}>
                                    0000001 · Tıkla
                                </div>

                                {/* Center content */}
                                <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px' }}>
                                    <div style={{
                                        fontSize: 'clamp(22px, 4vw, 30px)', fontWeight: 'bold',
                                        color: '#0a0a0a',
                                        fontFamily: 'var(--font-bebas), sans-serif',
                                        letterSpacing: '2px',
                                    }}>
                                        Fiyatlandırma
                                    </div>
                                    <div style={{
                                        fontSize: 'clamp(12px, 2vw, 14px)',
                                        color: '#c0392b',
                                        fontStyle: 'italic',
                                        fontWeight: '500',
                                    }}>
                                        İncele
                                    </div>

                                    {/* Small decorative element like the mascot in reference */}
                                    <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'center' }}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
                                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                            <line x1="3" y1="6" x2="21" y2="6" />
                                            <path d="M16 10a4 4 0 0 1-8 0" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Bottom label */}
                                <div style={{
                                    fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase',
                                    color: 'rgba(0,0,0,0.25)', fontFamily: 'monospace', textAlign: 'center',
                                    transform: 'rotate(180deg)',
                                }}>
                                    Fiyatları Gör
                                </div>

                                {/* Notches */}
                                <div style={{ position: 'absolute', top: '-10px', left: '-11px', width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(0,0,0,0.85)' }} />
                                <div style={{ position: 'absolute', bottom: '-10px', left: '-11px', width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(0,0,0,0.85)' }} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
