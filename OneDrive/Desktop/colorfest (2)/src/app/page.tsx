"use client";

import { useState, useEffect, useRef } from "react";
import ScratchCard from "../components/ScratchCard";

/* ── SVG Icons ─────────────────────────────────────────────────────── */
const SvgMic = ({ color }: { color: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mic-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor="#ff0088" />
      </linearGradient>
    </defs>
    <rect x="9" y="2" width="6" height="11" rx="3" fill="url(#mic-g)" />
    <path d="M5 10a7 7 0 0 0 14 0" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="17" x2="12" y2="21" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="9" y1="21" x2="15" y2="21" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SvgHeadphones = ({ color }: { color: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="hp-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor="#cc00ff" />
      </linearGradient>
    </defs>
    <path d="M3 17v-4a9 9 0 0 1 18 0v4" stroke="url(#hp-g)" strokeWidth="2.2" strokeLinecap="round" />
    <rect x="1" y="15" width="4" height="6" rx="2" fill={color} />
    <rect x="19" y="15" width="4" height="6" rx="2" fill={color} />
  </svg>
);

const SvgPalette = ({ color }: { color: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="pal-g" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor="#ff2200" />
      </radialGradient>
      <radialGradient id="pal-shine" cx="30%" cy="25%" r="50%">
        <stop offset="0%" stopColor="white" stopOpacity="0.5" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Palette body */}
    <path d="M12 2C6.48 2 2 6.48 2 12c0 2.76 1.12 5.26 2.93 7.07C6.59 14.5 9.1 12 12 12s5.41 2.5 7.07 7.07C20.88 17.26 22 14.76 22 12c0-5.52-4.48-10-10-10z" fill="url(#pal-g)" />
    <path d="M12 2C6.48 2 2 6.48 2 12c0 2.76 1.12 5.26 2.93 7.07C6.59 14.5 9.1 12 12 12s5.41 2.5 7.07 7.07C20.88 17.26 22 14.76 22 12c0-5.52-4.48-10-10-10z" fill="url(#pal-shine)" />
    {/* Color dots - vibrant rainbow */}
    <circle cx="8" cy="9.5" r="1.8" fill="#ff4444" />
    <circle cx="12" cy="6.5" r="1.8" fill="#ffdd00" />
    <circle cx="16" cy="9.5" r="1.8" fill="#44ff88" />
    <circle cx="16.5" cy="14" r="1.8" fill="#4488ff" />
    {/* Thumb hole */}
    <circle cx="15.5" cy="17.5" r="2.5" fill="#0d0d0d" opacity="0.8" />
    <circle cx="15.5" cy="17.5" r="1" fill="white" opacity="0.15" />
  </svg>
);

const SvgFoodDrink = ({ color }: { color: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="food-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor="#ffaa00" />
      </linearGradient>
    </defs>
    {/* Straw */}
    <path d="M9 7L10.5 3.5H12" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    {/* Cup Lid */}
    <rect x="5" y="7" width="8" height="2" rx="1" fill="url(#food-g)" />
    {/* Cup Body */}
    <path d="M6 10L7.1 19.3C7.2 20.3 8.1 21 9.1 21H9.9C10.9 21 11.8 20.3 11.9 19.3L13 10H6Z" fill="url(#food-g)" opacity="0.85" />

    {/* Hamburger */}
    {/* Top Bun */}
    <path d="M14 13.5C14 11.6 15.6 10 17.5 10C19.4 10 21 11.6 21 13.5H14Z" fill="url(#food-g)" />
    {/* Lettuce/Cheese (Middle Layer) */}
    <rect x="13" y="14.5" width="9" height="1.5" rx="0.75" fill="white" opacity="0.9" />
    {/* Meat Patty */}
    <rect x="13.5" y="17" width="8" height="1.5" rx="0.75" fill="url(#food-g)" />
    {/* Bottom Bun */}
    <path d="M14 19.5C14 20.3 14.7 21 15.5 21H19.5C20.3 21 21 20.3 21 19.5V19H14V19.5Z" fill="url(#food-g)" opacity="0.95" />
  </svg>
);

const SvgTent = ({ color }: { color: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="tent-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor="#ff00cc" />
      </linearGradient>
      <radialGradient id="tent-r" cx="50%" cy="0%" r="80%">
        <stop offset="0%" stopColor="white" stopOpacity="0.4" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Tent body */}
    <path d="M2 20L12 3l10 17H2z" fill="url(#tent-g)" />
    <path d="M2 20L12 3l10 17H2z" fill="url(#tent-r)" />
    {/* Center stripe */}
    <path d="M12 3L8.5 20h7L12 3z" fill="white" opacity="0.12" />
    {/* Door */}
    <path d="M9.5 20v-5a2.5 2.5 0 0 1 5 0v5" stroke="white" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />
    {/* Flag on top */}
    <path d="M12 3L14 6H12V3z" fill="white" opacity="0.8" />
    {/* Decorative dots */}
    <circle cx="7" cy="15" r="1" fill="white" opacity="0.5" />
    <circle cx="17" cy="15" r="1" fill="white" opacity="0.5" />
  </svg>
);

const SvgSponsorGame = ({ color }: { color: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sg-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor="#0033ff" />
      </linearGradient>
    </defs>
    {/* Gamepad controller body */}
    <path d="M18 7H6C4.1 7 2.5 8.6 2.5 10.5v5C2.5 17.4 4.1 19 6 19c1.1 0 2-.6 2.5-1.5L9.7 15.5C10 15 10.6 14.5 11.2 14.5h1.6c.6 0 1.2.5 1.5 1L15.5 17.5C16 18.4 16.9 19 18 19c1.9 0 3.5-1.6 3.5-3.5v-5C21.5 8.6 19.9 7 18 7Z" fill="url(#sg-g)" />

    {/* Directional Pad (D-pad) - Left */}
    <path d="M5.5 13H8.5M7 11.5V14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

    {/* Action Buttons - Right */}
    <circle cx="15.5" cy="12" r="0.8" fill="white" />
    <circle cx="17.5" cy="14" r="0.8" fill="white" />
    <circle cx="17.5" cy="11.5" r="0.6" fill="white" opacity="0.8" />
    <circle cx="15.5" cy="14" r="0.6" fill="white" opacity="0.8" />

    {/* Sponsor Star - Top Right */}
    <path d="M19 1L19.9 2.8L21.9 3.1L20.4 4.5L20.8 6.5L19 5.6L17.2 6.5L17.6 4.5L16.1 3.1L18.1 2.8L19 1Z" fill="#ffdd00" stroke="#ffaa00" strokeWidth="0.5" />
    <path d="M11 2L11.5 3L12.5 3.1L11.7 3.8L11.9 4.8L11 4.3L10.1 4.8L10.3 3.8L9.5 3.1L10.5 3L11 2Z" fill="#ffdd00" opacity="0.8" />
  </svg>
);

const SvgShield = ({ color }: { color: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sh-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor="#00aaff" />
      </linearGradient>
      <linearGradient id="sh-shine" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="white" stopOpacity="0.35" />
        <stop offset="60%" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path d="M12 2L4 6v6c0 4.97 3.5 9.25 8 10.93C16.5 21.25 20 16.97 20 12V6l-8-4z" fill="url(#sh-g)" />
    <path d="M12 2L4 6v6c0 4.97 3.5 9.25 8 10.93C16.5 21.25 20 16.97 20 12V6l-8-4z" fill="url(#sh-shine)" />
    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Inner glow ring */}
    <path d="M12 4.5L5.5 7.8v5.2c0 3.8 2.8 7.2 6.5 8.5c3.7-1.3 6.5-4.7 6.5-8.5V7.8L12 4.5z" stroke="white" strokeWidth="0.8" strokeOpacity="0.25" />
  </svg>
);

const SvgBus = ({ color }: { color: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bus-g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor="#cc2200" />
      </linearGradient>
    </defs>
    {/* Bus body */}
    <rect x="1" y="4" width="22" height="13" rx="3" fill="url(#bus-g)" />
    {/* Roof stripe */}
    <rect x="1" y="4" width="22" height="3" rx="3" fill="white" opacity="0.2" />
    {/* Windows */}
    <rect x="3" y="7.5" width="5" height="4" rx="1.2" fill="white" opacity="0.92" />
    <rect x="9.5" y="7.5" width="5" height="4" rx="1.2" fill="white" opacity="0.92" />
    <rect x="16" y="7.5" width="5" height="4" rx="1.2" fill="white" opacity="0.92" />
    {/* Door */}
    <rect x="10" y="13" width="4" height="4" rx="0.8" fill="white" opacity="0.3" />
    {/* Wheels */}
    <circle cx="6.5" cy="19.5" r="2.5" fill={color} stroke="white" strokeWidth="1.2" />
    <circle cx="17.5" cy="19.5" r="2.5" fill={color} stroke="white" strokeWidth="1.2" />
    <circle cx="6.5" cy="19.5" r="1" fill="white" opacity="0.5" />
    <circle cx="17.5" cy="19.5" r="1" fill="white" opacity="0.5" />
  </svg>
);

const SvgTree = ({ color }: { color: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="tree-g" x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor="#006622" />
      </linearGradient>
      <linearGradient id="tree-g2" x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="0.9" />
        <stop offset="100%" stopColor="#004411" />
      </linearGradient>
    </defs>
    {/* Tree layers */}
    <path d="M12 2L4 11h5L6 18h12l-3-7h5L12 2z" fill="url(#tree-g)" />
    {/* Highlights */}
    <path d="M12 2L9 8h3.5L12 2z" fill="white" opacity="0.2" />
    <path d="M12 11L10 15h4L12 11z" fill="white" opacity="0.15" />
    {/* Trunk */}
    <rect x="10.5" y="18" width="3" height="4" rx="1" fill="url(#tree-g2)" />
    {/* Little star sparkles */}
    <circle cx="8" cy="9" r="1" fill="white" opacity="0.4" />
    <circle cx="16" cy="13" r="0.8" fill="white" opacity="0.3" />
  </svg>
);

const SvgParking = ({ color }: { color: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="park-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor="#0055ff" />
      </linearGradient>
      <linearGradient id="park-shine" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="white" stopOpacity="0.3" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#park-g)" />
    <rect x="2" y="2" width="20" height="10" rx="6" fill="url(#park-shine)" />
    {/* P letter */}
    <path d="M9 7h5.5a3.5 3.5 0 0 1 0 7H9V7z" fill="white" opacity="0.95" />
    <line x1="9" y1="14" x2="9" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    {/* Highlight dot */}
    <circle cx="17" cy="5" r="1.5" fill="white" opacity="0.3" />
  </svg>
);

const SvgPhone = ({ color }: { color: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ph-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor="#ff0088" />
      </linearGradient>
    </defs>
    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.58.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.03 21 3 13.97 3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.24 1.02L6.6 10.8z" fill="url(#ph-g)" />
  </svg>
);

const SvgMail = ({ color }: { color: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mail-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor="#cc00ff" />
      </linearGradient>
    </defs>
    <rect x="2" y="4" width="20" height="16" rx="3" fill="url(#mail-g)" />
    <path d="M2 7l10 7 10-7" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const SvgInstagram = ({ color }: { color: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ig-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="25%" stopColor="#e6683c" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="75%" stopColor="#cc2366" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#ig-g)" />
    <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.8" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
  </svg>
);

const SvgFoosball = ({ size = 44 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="foos-pitch" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1e5128" />
        <stop offset="100%" stopColor="#0f3016" />
      </linearGradient>
      <linearGradient id="foos-border" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f39c12" />
        <stop offset="100%" stopColor="#d35400" />
      </linearGradient>
      <filter id="foos-glow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="2" stdDeviation="1" floodOpacity="0.3" />
      </filter>
    </defs>
    
    <rect x="2" y="4" width="20" height="16" rx="3" fill="url(#foos-pitch)" stroke="url(#foos-border)" strokeWidth="1.5" filter="url(#foos-glow)" />
    
    <line x1="12" y1="4" x2="12" y2="20" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
    <circle cx="12" cy="12" r="3.5" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.8" />
    
    <rect x="0" y="6.5" width="2" height="1" rx="0.3" fill="#34495e" />
    <rect x="0" y="11.5" width="2" height="1" rx="0.3" fill="#34495e" />
    <rect x="0" y="16.5" width="2" height="1" rx="0.3" fill="#34495e" />
    
    <rect x="22" y="6.5" width="2" height="1" rx="0.3" fill="#34495e" />
    <rect x="22" y="11.5" width="2" height="1" rx="0.3" fill="#34495e" />
    <rect x="22" y="16.5" width="2" height="1" rx="0.3" fill="#34495e" />

    <line x1="6" y1="3" x2="6" y2="21" stroke="#bdc3c7" strokeWidth="1" />
    <line x1="10" y1="3" x2="10" y2="21" stroke="#bdc3c7" strokeWidth="1" />
    <line x1="14" y1="3" x2="14" y2="21" stroke="#bdc3c7" strokeWidth="1" />
    <line x1="18" y1="3" x2="18" y2="21" stroke="#bdc3c7" strokeWidth="1" />

    <rect x="5.2" y="6.5" width="1.6" height="2.2" rx="0.4" fill="#00d2ff" />
    <rect x="5.2" y="15.3" width="1.6" height="2.2" rx="0.4" fill="#00d2ff" />
    <rect x="13.2" y="5.0" width="1.6" height="2.2" rx="0.4" fill="#00d2ff" />
    <rect x="13.2" y="10.9" width="1.6" height="2.2" rx="0.4" fill="#00d2ff" />
    <rect x="13.2" y="16.8" width="1.6" height="2.2" rx="0.4" fill="#00d2ff" />

    <rect x="17.2" y="6.5" width="1.6" height="2.2" rx="0.4" fill="#ff3f3f" />
    <rect x="17.2" y="15.3" width="1.6" height="2.2" rx="0.4" fill="#ff3f3f" />
    <rect x="9.2" y="5.0" width="1.6" height="2.2" rx="0.4" fill="#ff3f3f" />
    <rect x="9.2" y="10.9" width="1.6" height="2.2" rx="0.4" fill="#ff3f3f" />
    <rect x="9.2" y="16.8" width="1.6" height="2.2" rx="0.4" fill="#ff3f3f" />

    <circle cx="12" cy="12" r="1.3" fill="#ffffff" stroke="#000000" strokeWidth="0.4" />
  </svg>
);

const SvgMusic = ({ color }: { color: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mus-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor="#ff0088" />
      </linearGradient>
    </defs>
    {/* Equalizer bars */}
    <rect x="2" y="10" width="3" height="11" rx="1.5" fill="url(#mus-g)" />
    <rect x="7" y="6" width="3" height="15" rx="1.5" fill="url(#mus-g)" opacity="0.9" />
    <rect x="12" y="3" width="3" height="18" rx="1.5" fill="url(#mus-g)" />
    <rect x="17" y="7" width="3" height="14" rx="1.5" fill="url(#mus-g)" opacity="0.85" />
    {/* Shine */}
    <rect x="2" y="10" width="3" height="4" rx="1.5" fill="white" opacity="0.3" />
    <rect x="12" y="3" width="3" height="5" rx="1.5" fill="white" opacity="0.3" />
  </svg>
);

const SvgFamily = ({ color }: { color: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fam-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor="#00eeff" />
      </linearGradient>
    </defs>
    {/* Adults */}
    <circle cx="6.5" cy="5" r="2.5" fill="url(#fam-g)" />
    <circle cx="17.5" cy="5" r="2.5" fill="url(#fam-g)" />
    {/* Child */}
    <circle cx="12" cy="6.5" r="2" fill="url(#fam-g)" opacity="0.85" />
    {/* Body lines */}
    <path d="M2 21v-3.5a4.5 4.5 0 0 1 4.5-4.5h1" stroke="url(#fam-g)" strokeWidth="2" strokeLinecap="round" />
    <path d="M22 21v-3.5a4.5 4.5 0 0 0-4.5-4.5h-1" stroke="url(#fam-g)" strokeWidth="2" strokeLinecap="round" />
    <path d="M9 21v-2.5a3 3 0 0 1 6 0V21" stroke="url(#fam-g)" strokeWidth="2" strokeLinecap="round" />
    {/* Heart in the middle */}
    <path d="M12 11.5c0 0-3-2-3-3.8a1.8 1.8 0 0 1 3-1.3 1.8 1.8 0 0 1 3 1.3c0 1.8-3 3.8-3 3.8z" fill="white" opacity="0.6" />
  </svg>
);

const SvgSun = ({ color }: { color: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sun-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor="#ffaa00" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="5" fill="url(#sun-g)" />
    <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.536-7.071l-1.414 1.414M5.879 18.121l-1.414 1.414m14.142 0l-1.414-1.414M5.879 5.879L4.464 4.464" stroke="url(#sun-g)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SvgWhatsapp = ({ color }: { color: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.709 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill={color}/>
  </svg>
);

/* ── Data ─────────────────────────────────────────────────────── */
const STATS = [
  { val: "5.000+", sub: "Katılımcı", color: "var(--orange)" },
  { val: "2", sub: "Canlı Konser", color: "var(--pink)" },
  { val: "1", sub: "Efsane Gün", color: "var(--purple)" },
  { val: "∞", sub: "Renk & Deneyim", color: "var(--cyan)" },
];

const ARTISTS = [
  {
    name: "RECKOL", role: "Headliner", genre: "Türkçe Trap", color: "var(--orange)", tag: "pill-orange", img: "/images/reckol.webp", objPos: "center 25%",
    desc: "Türkçe trap sahnesinin en dinamik ve üretken isimlerinden biri. Listeleri sallayan hit parçaları ve yüksek enerjili sahne şovuyla ColorFest coşkusunu zirveye taşıyacak."
  },
  {
    name: "YAHYA BABUZ", role: "Ana Konuk", genre: "Alternatif Rock", color: "var(--pink)", tag: "pill-pink", img: "/images/yahya_babuz.webp", objPos: "center 15%",
    desc: "Skapova'nın efsane vokalisti. Muhteşem performansıyla ColorFest'in yıldızı olacak."
  },
  {
    name: "DJ ABDULLAH", role: "Warm-Up DJ", genre: "Elektronik", color: "var(--cyan)", tag: "pill-cyan", img: "/images/abdullah_demir.webp", objPos: "center",
    desc: "Elektro dans setleriyle festivale heyecanlı giriş. Sahne sıcaklığını zirveye taşıyacak."
  },
  {
    name: "MC BARIŞ EKMEN", role: "Host", genre: "Festival Sunumu", color: "var(--yellow)", tag: "pill-yellow", img: "/images/baris_ekmen.webp", objPos: "center 12%",
    desc: "Gün boyunca sürprizler, oyunlar ve eğlenceli anlarla sahnede. Enerjiyi üst seviyede tutacak."
  },
];

const SCHEDULE = [
  { time: "11:00", act: "Kapılar Açılıyor", stage: "Giriş Kontrol", color: "var(--cyan)" },
  { time: "12:00", act: "Color Throw — 1. Seans", stage: "Açık Alan", color: "var(--orange)" },
  { time: "13:30", act: "DJ Abdullah Seti", stage: "Yan Sahne", color: "var(--blue)" },
  { time: "15:00", act: "Color Throw — 2. Seans", stage: "Açık Alan", color: "var(--pink)" },
  { time: "16:30", act: "Yahya Babuz", stage: "Ana Sahne", color: "var(--pink)" },
  { time: "18:00", act: "Color Throw — 3. Seans", stage: "Açık Alan", color: "var(--orange)" },
  { time: "19:00", act: "Reckol", stage: "Ana Sahne", color: "var(--red)" },
  { time: "21:00", act: "Final & Kapanış", stage: "Tüm Alan", color: "var(--cyan)" },
];

/* ── Component ─────────────────────────────────────────────── */
const Marquee = ({ text, bg, color }: { text: string, bg: string, color: string }) => (
  <div style={{ background: bg, overflow: "hidden", whiteSpace: "nowrap", padding: "16px 0", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center" }}>
    <div style={{ display: "inline-block", animation: "marquee 25s linear infinite", color: color, fontSize: 14, fontWeight: 900, letterSpacing: "0.15em", textTransform: "uppercase" }}>
      {Array(10).fill(text).join(" ✦ ")}
    </div>
  </div>
);
export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Countdown timer effect
  useEffect(() => {
    setMounted(true);
    const targetDate = new Date("2026-06-21T11:00:00+03:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Section visibility tracking (IntersectionObserver) & Phone click tracking
  useEffect(() => {
    if (!mounted) return;

    // Track phone number clicks as standard Contact event
    const handlePhoneClick = () => {
      if (typeof window !== "undefined") {
        if ((window as any).fbq) {
          (window as any).fbq('track', 'Contact', { content_name: 'Phone Click' });
        }
        if ((window as any).ttq) {
          (window as any).ttq.track('Contact', { content_name: 'Phone Click' });
        }
      }
    };

    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
      link.addEventListener('click', handlePhoneClick);
    });

    // IntersectionObserver to handle custom ViewContent tracking in the background
    const sectionNames: Record<string, string> = {
      'festival': 'Giriş (Hero)',
      'stats': 'İstatistikler (Stats)',
      'nedir': 'ColorFest Nedir (About)',
      'sahne': 'Sahne Kadrosu (Artists)',
      'program': 'Program / Akış (Schedule)',
      'alan': 'Yerleşim & Kampüs (Campus)',
      'kayit': 'Kayıt Formu & Bilet (Tickets)',
      'iletisim': 'İletişim & Footer'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const sectionName = sectionNames[id] || 'Diğer Bölüm';
          if (typeof window !== "undefined") {
            if ((window as any).fbq) {
              (window as any).fbq('track', 'ViewContent', {
                content_name: sectionName,
                content_category: 'Section View'
              });
            }
            if ((window as any).ttq) {
              (window as any).ttq.track('ViewContent', {
                content_name: sectionName,
                content_category: 'Section View'
              });
            }
          }
          // Unobserve so we only track once per page load
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12, // Trigger when 12% of the section enters the viewport
      rootMargin: "0px 0px -40px 0px"
    });

    Object.keys(sectionNames).forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      phoneLinks.forEach(link => {
        link.removeEventListener('click', handlePhoneClick);
      });
    };
  }, [mounted]);

  // Canvas paint splash effect

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      decay: number;
    }> = [];

    const colors = ["#ff4400", "#ff0088", "#8800ff", "#0033ff", "#00ccff", "#ffdd00", "#00ff88"];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      if (particles.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const nextParticles = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.alpha -= p.decay;

        if (p.alpha > 0) {
          nextParticles.push(p);

          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          // Removed expensive shadowBlur and shadowColor for buttery-smooth performance
          ctx.fill();
          ctx.restore();
        }
      }

      particles = nextParticles;
      animationFrameId = requestAnimationFrame(animate);
    };

    const createSplash = (clientX: number, clientY: number, auto = false) => {
      const count = auto ? (8 + Math.floor(Math.random() * 6)) : (16 + Math.floor(Math.random() * 8));
      const startLength = particles.length;

      // Capping total particles to avoid performance degradation on mobile
      if (startLength > 200) return;

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = auto ? (1.5 + Math.random() * 4) : (2 + Math.random() * 6);
        particles.push({
          x: clientX,
          y: clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (auto ? 1.0 : 1.5),
          radius: auto ? (2 + Math.random() * 4) : (3 + Math.random() * 6),
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: auto ? (0.01 + Math.random() * 0.015) : (0.015 + Math.random() * 0.015)
        });
      }

      if (startLength === 0) {
        animate();
      }
    };

    const handleInteraction = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;

      if ("touches" in e) {
        if (e.touches.length === 0) return;
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      createSplash(clientX, clientY, false);
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction, { passive: true });

    // Automatic random splashes
    let autoSplashTimeoutId: NodeJS.Timeout;
    const triggerAutoSplash = () => {
      const rx = Math.random() * window.innerWidth;
      // Splashes in the middle/upper viewport areas look best
      const ry = 100 + Math.random() * (window.innerHeight - 200);
      createSplash(rx, ry, true);
      
      autoSplashTimeoutId = setTimeout(triggerAutoSplash, 4000 + Math.random() * 5000);
    };

    // Delay first auto splash a bit
    autoSplashTimeoutId = setTimeout(triggerAutoSplash, 5000);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(autoSplashTimeoutId);
    };
  }, []);

  return (
    <div style={{ color: "var(--ink)", overflowX: "hidden", position: "relative" }}>
      {/* Interactive Color Splash Canvas */}
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none" }} />
      {/* Global Color Smoke Background for Light Areas (Optimized for Mobile scroll performance) */}
      <div style={{
        position: "fixed",
        inset: 0,
        backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.93), rgba(255, 255, 255, 0.93)), url('/images/color_smoke_bg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: -1,
        pointerEvents: "none"
      }} />

      {/* ══════════════════════════════════════════════════════════
          HERO — white bg, giant text, EXPLOSIVE layered blobs
      ══════════════════════════════════════════════════════════ */}
      <section id="festival" className="res-hero" style={{
        position: "relative",
        display: "flex", alignItems: "center", overflow: "hidden",
        background: "transparent", zIndex: 1
      }}>

        {/* Dots pattern */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.03,
          backgroundImage: "radial-gradient(var(--ink) 1px, transparent 1px)",
          backgroundSize: "28px 28px", pointerEvents: "none"
        }} />

        {/* ── L1: Massive warm base blob */}
        <div className="blob blob-grad-1 anim-blob"
          style={{
            width: 750, height: 750, top: "50%", right: "-160px",
            transform: "translateY(-52%)", opacity: 0.92, zIndex: 1, filter: "blur(3px)"
          }} />

        {/* ── L2: Cool blue-cyan screen blend */}
        <div style={{
          position: "absolute", width: 580, height: 580, top: "18%", right: "50px",
          borderRadius: "40% 60% 55% 45% / 55% 40% 60% 45%",
          background: "linear-gradient(135deg, #8800ff 0%, #0033ff 40%, #00ccff 70%, #00ff88 100%)",
          opacity: 0.82, zIndex: 2, filter: "blur(6px)", pointerEvents: "none",
          mixBlendMode: "screen",
          animation: "blob-morph2 14s ease-in-out infinite"
        }} />

        {/* ── L3: Yellow-hot fireball top-right */}
        <div style={{
          position: "absolute", width: 420, height: 420, top: "2%", right: "160px",
          borderRadius: "65% 35% 50% 50% / 40% 65% 35% 60%",
          background: "linear-gradient(135deg, #ffdd00 0%, #ff4400 50%, #ff0088 100%)",
          opacity: 0.72, zIndex: 3, filter: "blur(12px)", pointerEvents: "none",
          mixBlendMode: "multiply",
          animation: "blob-morph 18s ease-in-out infinite reverse"
        }} />

        {/* ── L4: Spinning conic rainbow wheel */}
        <div style={{
          position: "absolute", width: 320, height: 320,
          top: "58%", right: "260px", borderRadius: "50%",
          background: "conic-gradient(#ff4400,#ff0088,#cc00ff,#0033ff,#00ccff,#00ff88,#ffdd00,#ff4400)",
          opacity: 0.65, zIndex: 4, filter: "blur(20px)", pointerEvents: "none",
          animation: "spin-slow 18s linear infinite"
        }} />

        {/* ── L5: Cyan cold sphere bottom */}
        <div style={{
          position: "absolute", width: 350, height: 350,
          bottom: "0%", right: "20px", borderRadius: "50%",
          background: "radial-gradient(circle, #00ccff 0%, #8800ff 55%, transparent 80%)",
          opacity: 0.72, zIndex: 3, filter: "blur(14px)", pointerEvents: "none",
          mixBlendMode: "screen",
          animation: "float 7s ease-in-out infinite"
        }} />

        {/* ── L6: Magenta burst center-right */}
        <div style={{
          position: "absolute", width: 260, height: 260,
          top: "40%", right: "380px", borderRadius: "50%",
          background: "radial-gradient(circle, #ff0088 0%, #cc00ff 50%, transparent 80%)",
          opacity: 0.58, zIndex: 5, filter: "blur(8px)", pointerEvents: "none",
          mixBlendMode: "screen",
          animation: "blob-morph2 11s ease-in-out infinite"
        }} />

        {/* ── Burst rings */}
        {[0, 0.9, 1.8].map((delay, i) => (
          <div key={i} style={{
            position: "absolute",
            width: 580 + i * 90, height: 580 + i * 90,
            top: "50%", right: "-60px",
            transform: "translateY(-50%)",
            borderRadius: "50%", border: `${2.5 - i * 0.6}px solid`,
            borderColor: ["rgba(255,68,0,0.45)", "rgba(255,0,136,0.32)", "rgba(136,0,255,0.22)"][i],
            zIndex: 6, pointerEvents: "none",
            animation: `burst-expand 3s ease-out infinite ${delay}s`
          }} />
        ))}

        {/* ── Hot-spot accents */}
        <div style={{
          position: "absolute", top: 60, left: 60, zIndex: 0, pointerEvents: "none",
          width: 240, height: 240, borderRadius: "50%",
          background: "radial-gradient(circle, #ff0088 0%, #8800ff 55%, transparent 80%)",
          opacity: 0.16, filter: "blur(32px)"
        }} />
        <div style={{
          position: "absolute", bottom: 40, left: 200, zIndex: 0, pointerEvents: "none",
          width: 180, height: 180, borderRadius: "50%",
          background: "radial-gradient(circle, #00ccff 0%, #0033ff 60%, transparent 80%)",
          opacity: 0.14, filter: "blur(28px)"
        }} />

        <div style={{
          maxWidth: 1280, margin: "0 auto", padding: "0 24px",
          width: "100%", position: "relative", zIndex: 10
        }}>
          <div style={{ maxWidth: 660 }}>

            {/* Liquid Glass text container for maximum readability and aesthetics */}
            <div style={{
              background: "rgba(255, 255, 255, 0.45)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.55)",
              borderRadius: 28,
              padding: "40px 36px",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.04), inset 0 0 0 1px rgba(255, 255, 255, 0.3)",
              marginBottom: 32,
              position: "relative",
              zIndex: 2
            }}>
              {/* Pill label */}
              <div style={{ marginBottom: 20 }}>
                <span className="pill pill-orange">✦ 21 Haziran 2026 • Konya</span>
              </div>

              {/* Giant headline */}
              <h1 style={{ marginBottom: 24, lineHeight: 0.95 }}>
                <span style={{
                  color: "var(--ink)",
                  fontSize: "clamp(1.2rem, 3vw, 2.2rem)",
                  fontWeight: 800,
                  letterSpacing: "0.45em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 10,
                  opacity: 0.9
                }}>KONYA</span>

                <span className="g-rainbow font-logo-brush" style={{
                  fontSize: "clamp(2.8rem, 9.5vw, 7.2rem)",
                  display: "block",
                  lineHeight: 0.9,
                  letterSpacing: "-0.01em"
                }}>COLORFEST</span>

                <span style={{
                  color: "var(--orange)",
                  fontSize: "clamp(0.85rem, 2vw, 1.15rem)",
                  fontWeight: 900,
                  letterSpacing: "0.15em",
                  display: "block",
                  marginTop: 12,
                  textTransform: "uppercase"
                }}>TEK GÜNDE İKİ FARKLI DÜNYA</span>
              </h1>

              <p style={{
                fontSize: 17, lineHeight: 1.7, color: "#1f1f2e",
                maxWidth: 520, margin: 0
              }}>
                Müzik, renk ve enerjinin buluştuğu efsane festival. YKS sonrası
                Konya&apos;nın gençlerine ve ailelerine unutulmaz bir gün yaşatıyoruz —
                <strong style={{ color: "var(--ink)" }}> Konya Extreme ve Doğa Park</strong>&apos;ta.
              </p>
            </div>

            {/* Neon Glassmorphic Countdown Timer */}
            {mounted && (
              <div style={{
                display: "flex",
                gap: 12,
                marginBottom: 32,
                maxWidth: 400
              }}>
                {[
                  { label: "GÜN", value: timeLeft.days, color: "var(--orange)" },
                  { label: "SAAT", value: timeLeft.hours, color: "var(--pink)" },
                  { label: "DK", value: timeLeft.minutes, color: "var(--purple)" },
                  { label: "SN", value: timeLeft.seconds, color: "var(--cyan)" }
                ].map((item, idx) => (
                  <div key={idx} style={{
                    flex: 1,
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0.92))",
                    border: `1px solid color-mix(in srgb, ${item.color} 25%, rgba(255, 255, 255, 0.4))`,
                    borderRadius: 14,
                    padding: "10px 8px",
                    textAlign: "center",
                    boxShadow: `0 4px 12px color-mix(in srgb, ${item.color} 10%, transparent)`,
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)"
                  }}>
                    <div style={{
                      fontSize: "clamp(1.3rem, 4vw, 1.7rem)",
                      fontWeight: 900,
                      color: "var(--ink)",
                      textShadow: `0 0 10px color-mix(in srgb, ${item.color} 30%, transparent)`
                    }}>
                      {String(item.value).padStart(2, "0")}
                    </div>
                    <div style={{
                      fontSize: 9,
                      fontWeight: 800,
                      color: item.color,
                      letterSpacing: "0.05em",
                      marginTop: 2
                    }}>
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 10 }}>
              <a href="https://www.bubilet.com.tr/konya/etkinlik/konya-color-fest"
                target="_blank" rel="noopener noreferrer"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    if ((window as any).fbq) {
                      (window as any).fbq('track', 'Purchase', { value: 350.00, currency: 'TRY' });
                    }
                    if ((window as any).ttq) {
                      (window as any).ttq.track('Purchase', { value: 350.00, currency: 'TRY' });
                    }
                    if ((window as any).gtag) {
                      (window as any).gtag('event', 'purchase', {
                        value: 350.00, currency: 'TRY',
                        items: [{ item_id: 'colorfest_ticket', item_name: 'ColorFest Konya Bilet', price: 350.00, quantity: 1 }]
                      });
                      (window as any).gtag('event', 'ticket_click', {
                        event_category: 'Engagement', event_label: 'Bubilet Ticket Click', value: 350.00, currency: 'TRY'
                      });
                    }
                  }
                }}
                className="btn btn-festival"
                style={{ padding: "16px 36px", borderRadius: 16, fontSize: 15 }}>
                <img src="https://www.bubilet.com.tr/assets/images/logo.svg" alt="Bubilet" decoding="async" style={{ height: 20, filter: "brightness(0) invert(1)" }} />
                &apos;ten Bilet Al →
              </a>
              <a href="#program" className="btn btn-ghost"
                style={{ padding: "16px 32px", borderRadius: 16, fontSize: 14 }}>
                Program & Sahne
              </a>
            </div>
            <div style={{ marginTop: 16 }}>
              <a href="https://chat.whatsapp.com/Ky400yj96rz7wEtRGToWbx"
                target="_blank" rel="noopener noreferrer"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    if ((window as any).fbq) {
                      (window as any).fbq('track', 'Contact', { content_name: 'WhatsApp Community Link Click' });
                    }
                    if ((window as any).ttq) {
                      (window as any).ttq.track('Contact', { content_name: 'WhatsApp Community Link Click' });
                    }
                    if ((window as any).gtag) {
                      (window as any).gtag('event', 'whatsapp_click', {
                        event_category: 'Engagement',
                        event_label: 'WhatsApp Community Link Click',
                        method: 'WhatsApp'
                      });
                    }
                  }
                }}
                className="btn btn-whatsapp-community"
                style={{ padding: "16px 32px", borderRadius: 16, fontSize: 14, width: "100%", maxWidth: 400 }}>
                <SvgWhatsapp color="white" />
                <span>WhatsApp Topluluğumuza Katılın</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════════════════════ */}
      <Marquee text="COLORFEST KONYA 2026" bg="var(--ink2)" color="var(--orange)" />

      <section id="stats" className="res-section" style={{ background: "var(--ink)", position: "relative", overflow: "hidden" }}>
        {[["#ff4400", "-10%", "20%"], ["#ff0088", "25%", "55%"], ["#8800ff", "58%", "25%"], ["#00ccff", "85%", "50%"]]
          .map(([c, l, t], i) => (
            <div key={i} style={{
              position: "absolute", width: 200, height: 200, borderRadius: "50%",
              background: `radial-gradient(circle, ${c} 0%, transparent 70%)`,
              opacity: 0.28, filter: "blur(50px)", left: l, top: t, pointerEvents: "none"
            }} />
          ))}
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32 }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div className="stat-num" style={{
                  color: s.color,
                  textShadow: `0 0 40px ${s.color}bb, 0 0 100px ${s.color}44`
                }}>
                  {s.val}
                </div>
                <div className="text-muted-dark" style={{
                  fontSize: 12, fontWeight: 700, letterSpacing: "0.12em",
                  textTransform: "uppercase", marginTop: 6
                }}>
                  {s.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rainbow thin line */}
      <div style={{
        height: 4, background:
          "linear-gradient(90deg, var(--orange), var(--red), var(--pink), var(--magenta), var(--purple), var(--blue), var(--cyan))"
      }} />

      <Marquee text="MÜZİK • EĞLENCE • DENEYİM" bg="var(--offwhite)" color="var(--pink)" />

      {/* ══════════════════════════════════════════════════════════
          COLORFEST NEDİR
      ══════════════════════════════════════════════════════════ */}
      <section id="nedir" className="res-section" style={{ background: "transparent", zIndex: 1, minHeight: "100dvh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>

        {/* Soft, transparent background blobs for ColorFest theme */}
        <div style={{
          position: "absolute", width: 550, height: 550, top: "-100px", left: "-100px",
          borderRadius: "50%", background: "radial-gradient(circle, rgba(0, 204, 255, 0.15) 0%, transparent 70%)",
          filter: "blur(60px)", pointerEvents: "none", zIndex: 0
        }} />

        <div style={{
          position: "absolute", width: 600, height: 600, bottom: "-150px", right: "-100px",
          borderRadius: "50%", background: "radial-gradient(circle, rgba(255, 0, 136, 0.12) 0%, transparent 70%)",
          filter: "blur(70px)", pointerEvents: "none", zIndex: 0
        }} />

        <div style={{
          position: "absolute", width: 400, height: 400, top: "30%", right: "20%",
          borderRadius: "50%", background: "radial-gradient(circle, rgba(255, 68, 0, 0.08) 0%, transparent 70%)",
          filter: "blur(50px)", pointerEvents: "none", zIndex: 0
        }} />

        <div style={{
          maxWidth: 1280, margin: "0 auto", width: "100%",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40,
          alignItems: "center", position: "relative", zIndex: 1
        }}>

          {/* Left: dark card */}
          <div className="res-card-large" style={{
            background: "var(--ink2)", borderRadius: 28,
            position: "relative", overflow: "hidden"
          }}>
            <div className="blob blob-grad-1 anim-blob"
              style={{ width: 280, height: 280, bottom: -60, right: -60, opacity: 0.35 }} />

            <div style={{ position: "relative", zIndex: 1 }}>
              <span className="pill pill-white" style={{ marginBottom: 20, display: "inline-flex" }}>
                YKS Sonrası Büyük Parti
              </span>
              <h2 style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 900,
                lineHeight: 1, color: "white", marginBottom: 20
              }}>
                <span className="g-rainbow">COLORFEST</span>
                <br />
                <span style={{ color: "white" }}>NEDİR?</span>
              </h2>
              <p className="text-muted-dark" style={{ fontSize: 14, lineHeight: 1.75, marginBottom: 28 }}>
                Müzik, eğlence, deneyim alanları ve renk gösterilerini bir araya getiren
                <strong style={{ color: "white" }}> yeni nesil bir gençlik festivalidir.</strong>
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { svg: <SvgMusic color="var(--orange)" />, t: "3 Konser", c: "var(--orange)" },
                  { svg: <SvgPalette color="var(--pink)" />, t: "Color Throw", c: "var(--pink)" },
                  { svg: <SvgTent color="var(--purple)" />, t: "Deneyim Alanı", c: "var(--purple)" },
                  { svg: <SvgFamily color="var(--cyan)" />, t: "Aile Dostu", c: "var(--cyan)" },
                ].map(f => (
                  <div key={f.t} style={{
                    background: `linear-gradient(135deg, color-mix(in srgb, ${f.c} 12%, rgba(255,255,255,0.92)), color-mix(in srgb, ${f.c} 3%, rgba(255,255,255,0.96)))`,
                    border: `1px solid color-mix(in srgb, ${f.c} 25%, rgba(255,255,255,0.4))`,
                    borderRadius: 14, padding: "14px 16px",
                    display: "flex", alignItems: "center", gap: 10,
                    boxShadow: `0 4px 12px color-mix(in srgb, ${f.c} 12%, transparent)`,
                    transition: "all 0.3s ease"
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = `linear-gradient(135deg, color-mix(in srgb, ${f.c} 20%, rgba(255,255,255,0.88)), color-mix(in srgb, ${f.c} 6%, rgba(255,255,255,0.92)))`;
                      e.currentTarget.style.borderColor = `color-mix(in srgb, ${f.c} 50%, rgba(255,255,255,0.6))`;
                      e.currentTarget.style.boxShadow = `0 8px 20px color-mix(in srgb, ${f.c} 22%, transparent)`;
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = `linear-gradient(135deg, color-mix(in srgb, ${f.c} 12%, rgba(255,255,255,0.92)), color-mix(in srgb, ${f.c} 3%, rgba(255,255,255,0.96)))`;
                      e.currentTarget.style.borderColor = `color-mix(in srgb, ${f.c} 25%, rgba(255,255,255,0.4))`;
                      e.currentTarget.style.boxShadow = `0 4px 12px color-mix(in srgb, ${f.c} 12%, transparent)`;
                      e.currentTarget.style.transform = "none";
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", filter: `drop-shadow(0 0 8px ${f.c})` }}>{f.svg}</span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: f.c === "var(--cyan)" ? "#0088cc" : f.c }}>{f.t}</span>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: 28, background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 16, padding: "20px 24px", textAlign: "center"
              }}>
                <div style={{ fontSize: 44, fontWeight: 900 }} className="g-warm">5.000+</div>
                <div style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
                  textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginTop: 4
                }}>
                  Katılımcı Hedefi
                </div>
              </div>
            </div>
          </div>

          {/* Right: feature list */}
          <div>
            <span className="pill pill-orange" style={{ marginBottom: 20, display: "inline-flex" }}>
              Festivali Özel Yapan Şeyler
            </span>
            <h2 style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 900,
              lineHeight: 1.1, marginBottom: 28, color: "var(--ink)"
            }}>
              Gerçek Bir Festival<br />
              <span className="g-rainbow">Deneyimi</span>
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { svg: <SvgShield color="var(--orange)" />, t: "Güvenli & Kontrollü Alan", s: "Alkolsüz etkinlik, 24/7 güvenlik ve bilet kontrol sistemi.", c: "var(--orange)" },
                { svg: <SvgBus color="var(--pink)" />, t: "Ücretsiz Servis İmkânı", s: "Konya'nın 3 farklı noktasından ücretsiz servis.", c: "var(--pink)" },
                { svg: <SvgTree color="var(--purple)" />, t: "5.000 Kişilik Açık Alan", s: "Konya Extreme ve Doğa Park'ın geniş ve macera dolu alanı.", c: "var(--purple)" },
                { svg: <SvgParking color="var(--cyan)" />, t: "Geniş Otopark", s: "Katılımcılar için düzenli otopark.", c: "var(--cyan)" },
              ].map((item) => (
                <div key={item.t} className="card-w"
                  style={{
                    padding: "18px 20px",
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start",
                    background: `linear-gradient(135deg, color-mix(in srgb, ${item.c} 12%, rgba(255, 255, 255, 0.92)), color-mix(in srgb, ${item.c} 3%, rgba(255, 255, 255, 0.96))), url('/images/color_smoke_bg.webp')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: `1px solid color-mix(in srgb, ${item.c} 25%, rgba(255, 255, 255, 0.4))`,
                    boxShadow: `0 4px 20px color-mix(in srgb, ${item.c} 8%, transparent)`,
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `color-mix(in srgb, ${item.c} 55%, rgba(255, 255, 255, 0.7))`;
                    e.currentTarget.style.boxShadow = `0 10px 28px color-mix(in srgb, ${item.c} 20%, transparent)`;
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.background = `linear-gradient(135deg, color-mix(in srgb, ${item.c} 18%, rgba(255, 255, 255, 0.88)), color-mix(in srgb, ${item.c} 6%, rgba(255, 255, 255, 0.92))), url('/images/color_smoke_bg.webp')`;
                    e.currentTarget.style.backgroundSize = "cover";
                    e.currentTarget.style.backgroundPosition = "center";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = `color-mix(in srgb, ${item.c} 25%, rgba(255, 255, 255, 0.4))`;
                    e.currentTarget.style.boxShadow = `0 4px 20px color-mix(in srgb, ${item.c} 8%, transparent)`;
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.background = `linear-gradient(135deg, color-mix(in srgb, ${item.c} 12%, rgba(255, 255, 255, 0.92)), color-mix(in srgb, ${item.c} 3%, rgba(255, 255, 255, 0.96))), url('/images/color_smoke_bg.webp')`;
                    e.currentTarget.style.backgroundSize = "cover";
                    e.currentTarget.style.backgroundPosition = "center";
                  }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: `color-mix(in srgb, ${item.c} 12%, white)`,
                    boxShadow: `0 0 14px color-mix(in srgb, ${item.c} 30%, transparent)`
                  }}>
                    {item.svg}
                  </div>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: 14, color: item.c === "var(--cyan)" ? "#0088cc" : item.c, marginBottom: 4 }}>{item.t}</div>
                    <div className="text-muted-light" style={{ fontSize: 13, marginTop: 3, lineHeight: 1.5 }}>{item.s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Marquee text="KONYA'NIN EN BÜYÜK SAHNESİ" bg="var(--ink3)" color="var(--purple)" />

      {/* ══════════════════════════════════════════════════════════
          SAHNE KADROSU
      ══════════════════════════════════════════════════════════ */}
      <section id="sahne" className="res-section" style={{
        background: "var(--ink)",
        scrollMarginTop: 64, position: "relative", overflow: "hidden", minHeight: "100dvh", display: "flex", flexDirection: "column", justifyContent: "center"
      }}>

        <div style={{
          position: "absolute", width: 600, height: 600, top: "-150px", right: "-120px",
          borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
          background: "linear-gradient(135deg, #ff4400, #ff0088, #cc00ff)",
          opacity: 0.18, filter: "blur(2px)", pointerEvents: "none",
          animation: "blob-morph 12s ease-in-out infinite"
        }} />
        <div style={{
          position: "absolute", width: 500, height: 500, bottom: "-80px", left: "-80px",
          borderRadius: "40% 60% 45% 55%",
          background: "linear-gradient(135deg, #8800ff, #0033ff, #00ccff)",
          opacity: 0.14, filter: "blur(4px)", pointerEvents: "none",
          animation: "blob-morph2 18s ease-in-out infinite"
        }} />
        <div style={{
          position: "absolute", width: 300, height: 300, top: "30%", left: "25%",
          borderRadius: "50%", background: "radial-gradient(circle, #ff0088 0%, transparent 70%)",
          opacity: 0.1, filter: "blur(40px)", pointerEvents: "none",
          mixBlendMode: "screen"
        }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="pill pill-white" style={{ marginBottom: 16, display: "inline-flex" }}>
              Müzik Dolu Unutulmaz Bir Gün
            </span>
            <h2 style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900,
              color: "white", lineHeight: 1
            }}>
              SAHNE <span className="g-rainbow">KADROSU</span>
            </h2>
            <p className="text-muted-dark" style={{ fontSize: 15, marginTop: 14 }}>
              ColorFest Konya 2026&apos;da sahne alacak isimler
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 24 }}>
            {ARTISTS.map((a, i) => (
              <div key={i} className="card-d" style={{ overflow: "hidden", position: "relative", display: "flex", flexDirection: "column", height: "100%" }}>
                <div style={{ height: 4, background: `linear-gradient(90deg, ${a.color}, transparent)`, position: "relative", zIndex: 2 }} />

                {/* Artist Image Container */}
                <div style={{ width: "100%", height: 260, position: "relative", overflow: "hidden", background: "var(--ink2)" }}>
                  <img
                    src={a.img}
                    alt={a.name}
                    className="artist-img"
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: a.objPos
                    }}
                  />
                  {/* Subtle vignette/gradient overlay to blend with the card background */}
                  <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "80px",
                    background: "linear-gradient(to top, var(--ink3), transparent)",
                    pointerEvents: "none"
                  }} />
                </div>

                {/* Content */}
                <div style={{ padding: "24px", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ marginBottom: 12 }}>
                    <span className={`pill ${a.tag}`} style={{ display: "inline-flex" }}>
                      {a.role}
                    </span>
                  </div>
                  <h3 style={{
                    fontSize: 22, fontWeight: 900, color: "white",
                    marginBottom: 4, lineHeight: 1.1
                  }}>{a.name}</h3>
                  <p style={{
                    fontSize: 11, fontWeight: 700, color: a.color,
                    letterSpacing: "0.08em", marginBottom: 16
                  }}>{a.genre}</p>
                  <p className="text-muted-dark" style={{ fontSize: 13, lineHeight: 1.6, flexGrow: 1 }}>{a.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA banner */}
          <div className="res-card-large" style={{
            marginTop: 56, borderRadius: 24, overflow: "hidden",
            background: "linear-gradient(135deg, var(--orange) 0%, var(--red) 30%, var(--pink) 60%, var(--purple) 100%)",
            textAlign: "center", position: "relative"
          }}>
            <div style={{
              position: "absolute", inset: 0, opacity: 0.07,
              backgroundImage: "radial-gradient(white 1px, transparent 1px)",
              backgroundSize: "24px 24px"
            }} />
            <p style={{
              fontSize: 13, fontWeight: 800, letterSpacing: "0.12em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.9)", marginBottom: 10
            }}>
              Gerçek Bir Festival Deneyimi
            </p>
            <h3 style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)", fontWeight: 900,
              color: "white", marginBottom: 24, position: "relative", zIndex: 1
            }}>
              Hazır mısın Konya?
            </h3>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
              <a href="https://www.bubilet.com.tr/konya/etkinlik/konya-color-fest"
                target="_blank" rel="noopener noreferrer"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    if ((window as any).fbq) {
                      (window as any).fbq('track', 'Purchase', { value: 350.00, currency: 'TRY' });
                    }
                    if ((window as any).ttq) {
                      (window as any).ttq.track('Purchase', { value: 350.00, currency: 'TRY' });
                    }
                    if ((window as any).gtag) {
                      (window as any).gtag('event', 'purchase', {
                        value: 350.00, currency: 'TRY',
                        items: [{ item_id: 'colorfest_ticket', item_name: 'ColorFest Konya Bilet', price: 350.00, quantity: 1 }]
                      });
                      (window as any).gtag('event', 'ticket_click', {
                        event_category: 'Engagement', event_label: 'Bubilet Ticket Click', value: 350.00, currency: 'TRY'
                      });
                    }
                  }
                }}
                className="btn"
                style={{
                  background: "white", color: "var(--ink)", padding: "14px 32px",
                  borderRadius: 14, fontSize: 12, fontWeight: 900,
                  display: "inline-flex", alignItems: "center", gap: 8,
                  boxShadow: "0 6px 28px rgba(0,0,0,0.2)", position: "relative", zIndex: 1
                }}>
                <img src="https://www.bubilet.com.tr/assets/images/logo.svg" alt="Bubilet" loading="lazy" decoding="async" style={{ height: 16, filter: "brightness(0)" }} />
                &apos;ten Bilet Al →
              </a>

              <a href="https://chat.whatsapp.com/Ky400yj96rz7wEtRGToWbx"
                target="_blank" rel="noopener noreferrer"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    if ((window as any).fbq) {
                      (window as any).fbq('track', 'Contact', { content_name: 'WhatsApp Community Link Click' });
                    }
                    if ((window as any).ttq) {
                      (window as any).ttq.track('Contact', { content_name: 'WhatsApp Community Link Click' });
                    }
                    if ((window as any).gtag) {
                      (window as any).gtag('event', 'whatsapp_click', {
                        event_category: 'Engagement',
                        event_label: 'WhatsApp Community Link Click',
                        method: 'WhatsApp'
                      });
                    }
                  }
                }}
                className="btn btn-whatsapp-community"
                style={{
                  padding: "14px 32px",
                  borderRadius: 14,
                  fontSize: 12,
                  width: "100%",
                  maxWidth: 320,
                  position: "relative",
                  zIndex: 1
                }}>
                <SvgWhatsapp color="white" />
                <span>WhatsApp Topluluğumuza Katılın</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Marquee text="KESİNTİSİZ EĞLENCE • SAAT BAŞI COLOR THROW" bg="var(--offwhite)" color="var(--orange)" />

      {/* ══════════════════════════════════════════════════════════
          SERVİS GÜZERGAHI — New Custom Section
      ══════════════════════════════════════════════════════════ */}
      <section id="servis" className="res-section" style={{
        background: "var(--offwhite)",
        position: "relative", overflow: "hidden", minHeight: "80dvh", display: "flex", flexDirection: "column", justifyContent: "center"
      }}>
        {/* Decorative elements */}
        <div style={{
          position: "absolute", top: "-150px", left: "-100px", width: 400, height: 400,
          background: "radial-gradient(circle, rgba(255,0,136,0.1) 0%, transparent 70%)",
          filter: "blur(40px)", borderRadius: "50%", pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute", bottom: "-100px", right: "-50px", width: 500, height: 500,
          background: "radial-gradient(circle, rgba(0,204,255,0.1) 0%, transparent 70%)",
          filter: "blur(60px)", borderRadius: "50%", pointerEvents: "none"
        }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span className="pill pill-orange" style={{ marginBottom: 16, display: "inline-flex" }}>
              • TEK GÜNDE İKİ FARKLI DÜNYA •
            </span>
            <h2 style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900,
              color: "var(--ink)", lineHeight: 1.1, display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap"
            }}>
              <SvgBus color="var(--orange)" />
              <span className="g-rainbow">COLORFEST</span>
              <span>SERVİS GÜZERGAHI</span>
            </h2>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 48, alignItems: "center"
          }}>
            {/* Left side: Route & Info */}
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              {/* Route Chain */}
              <div style={{ display: "flex", flexDirection: "column", gap: 20, position: "relative", marginLeft: 10 }}>
                {/* Vertical dashed line */}
                <div style={{
                  position: "absolute", left: 24, top: 20, bottom: 20, width: 2,
                  background: "linear-gradient(to bottom, var(--orange), var(--pink), var(--purple), var(--cyan))",
                  opacity: 0.5, borderRight: "2px dashed var(--offwhite)"
                }} />
                
                {[
                  { n: "1", id: "ANIT", color: "var(--orange)", desc: "Buluşma noktası, renkli yolculuğun ilk durağı!" },
                  { n: "2", id: "KULE", color: "var(--pink)", desc: "Şehrin simgesi, müziğin ve rengin buluşma noktası!" },
                  { n: "3", id: "OTOGAR", color: "var(--purple)", desc: "Yolcular burada, eğlenceye bir adım daha!" },
                  { n: "4", id: "BOSNA", color: "var(--cyan)", desc: "Renklerin coşkusu burada doruğa çıkıyor!" }
                ].map(stop => (
                  <div key={stop.n} style={{ display: "flex", gap: 24, alignItems: "center", position: "relative", zIndex: 1 }}>
                    <div style={{
                      width: 50, height: 50, borderRadius: "50%", background: `color-mix(in srgb, ${stop.color} 15%, white)`,
                      border: `2px solid ${stop.color}`, display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 900, fontSize: 20, color: stop.color, boxShadow: `0 4px 16px color-mix(in srgb, ${stop.color} 30%, transparent)`,
                      flexShrink: 0, transition: "transform 0.3s ease"
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                      {stop.n}
                    </div>
                    <div>
                      <h3 style={{ fontSize: 22, fontWeight: 900, color: stop.color, marginBottom: 4, letterSpacing: "0.05em" }}>{stop.id}</h3>
                      <p className="text-muted-light" style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.5 }}>{stop.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Info Cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { icon: <SvgPhone color="var(--orange)" />, t: "SERVİS SAATLERİ", s: "13:00 İTİBARİ İLE HER SAATTE BİR!", c: "var(--orange)", glow: "glow-orange" },
                  { icon: <SvgFamily color="var(--pink)" />, t: "HERKESİ BEKLİYORUZ!", s: "Renkli bir gün için servisimize bin, eğlenceyi kaçırma!", c: "var(--pink)", glow: "glow-pink" },
                  { icon: <SvgShield color="var(--cyan)" />, t: "ÜCRETSİZ SERVİS", s: "Etkinlik katılımcılarına özel ücretsiz ulaşım imkanı!", c: "var(--cyan)", glow: "glow-cyan" }
                ].map(info => (
                  <div key={info.t} style={{
                    padding: "16px 20px", borderRadius: 16, border: `1px solid color-mix(in srgb, ${info.c} 30%, transparent)`,
                    background: "white", boxShadow: "0 4px 20px rgba(0,0,0,0.04)", display: "flex", gap: 16, alignItems: "center",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateX(8px)";
                    e.currentTarget.style.boxShadow = `0 8px 24px color-mix(in srgb, ${info.c} 15%, transparent)`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.04)";
                  }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12, background: `color-mix(in srgb, ${info.c} 10%, white)`,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                    }}>
                      {info.icon}
                    </div>
                    <div>
                      <h4 style={{ fontSize: 15, fontWeight: 900, color: info.c, letterSpacing: "0.05em", marginBottom: 2 }}>{info.t}</h4>
                      <p className="text-muted-light" style={{ fontSize: 13, lineHeight: 1.4 }}>{info.s}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Bus Image & CTA */}
            <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "center" }}>
              <div style={{ position: "relative", width: "100%", maxWidth: 500 }}>
                {/* Glow behind bus */}
                <div style={{
                  position: "absolute", top: "10%", left: "10%", right: "10%", bottom: "10%",
                  background: "radial-gradient(circle, var(--pink) 0%, transparent 70%)", filter: "blur(50px)", opacity: 0.2, zIndex: 0
                }} />
                <img
                  src="/images/festival_bus.png"
                  alt="ColorFest Festival Bus"
                  loading="lazy"
                  decoding="async"
                  style={{ width: "100%", height: "auto", position: "relative", zIndex: 1, filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15))", transition: "transform 0.5s ease" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05) translateY(-10px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1) translateY(0)"}
                />
              </div>

              <div style={{ textAlign: "center", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h3 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 900, color: "var(--ink)", marginBottom: 24, fontStyle: "italic", textTransform: "uppercase" }}>
                  <span className="g-rainbow">BİN, RENKLEN, EĞLEN!</span>
                </h3>
                
                <div style={{ display: "flex", gap: 12, width: "100%", maxWidth: 420, flexDirection: "column" }}>
                  <a href="https://wa.me/905422286812?text=Merhaba,%20Colorfest%20servis%20g%C3%BCzergah%C4%B1%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
                    target="_blank" rel="noopener noreferrer"
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        if ((window as any).fbq) {
                          (window as any).fbq('track', 'Contact', { content_name: 'WhatsApp Service Info Click' });
                        }
                        if ((window as any).ttq) {
                          (window as any).ttq.track('Contact', { content_name: 'WhatsApp Service Info Click' });
                        }
                        if ((window as any).gtag) {
                          (window as any).gtag('event', 'whatsapp_click', {
                            event_category: 'Engagement',
                            event_label: 'WhatsApp Service Info Click',
                            method: 'WhatsApp'
                          });
                        }
                      }
                    }}
                    className="btn btn-whatsapp-community"
                    style={{ padding: "16px 32px", borderRadius: 16, fontSize: 13, width: "100%" }}>
                    <SvgWhatsapp color="white" />
                    <span>Servis Bilgisi İçin WhatsApp'tan Ulaşın</span>
                  </a>

                  <a href="https://chat.whatsapp.com/Ky400yj96rz7wEtRGToWbx"
                    target="_blank" rel="noopener noreferrer"
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        if ((window as any).fbq) {
                          (window as any).fbq('track', 'Contact', { content_name: 'WhatsApp Community Link Click' });
                        }
                        if ((window as any).ttq) {
                          (window as any).ttq.track('Contact', { content_name: 'WhatsApp Community Link Click' });
                        }
                        if ((window as any).gtag) {
                          (window as any).gtag('event', 'whatsapp_click', {
                            event_category: 'Engagement',
                            event_label: 'WhatsApp Community Link Click',
                            method: 'WhatsApp'
                          });
                        }
                      }
                    }}
                    className="btn btn-dark"
                    style={{ padding: "14px 32px", borderRadius: 16, fontSize: 13, width: "100%", background: "var(--ink)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>
                    <SvgFamily color="var(--orange)" />
                    <span>Topluluğa Sor</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          DENEYİM ALANLARI — scratch cards grid
      ══════════════════════════════════════════════════════════ */}
      <section id="deneyim" className="res-section" style={{
        background: "var(--ink)", position: "relative", overflow: "hidden", padding: "80px 20px"
      }}>
        {/* Decorative blobs */}
        <div className="blob blob-grad-1 anim-blob" style={{ width: 500, height: 500, top: -100, left: -150, opacity: 0.06 }} />
        <div className="blob blob-grad-3 anim-blob2" style={{ width: 400, height: 400, bottom: -80, right: -100, opacity: 0.07 }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="pill pill-purple" style={{ marginBottom: 16, display: "inline-flex" }}>
              🎉 Deneyim Alanları
            </span>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "white", marginBottom: 14, lineHeight: 1.1 }}>
              Festivali <span className="g-rainbow">Keşfet!</span>
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", maxWidth: 480, margin: "0 auto", lineHeight: 1.6 }}>
              Kartları kazı, sürprizi keşfet! Her köşede seni bekleyen eğlence aktiviteleri.
            </p>
          </div>

          {/* Scratch Cards Grid — 2 cols mobile, 5 cols desktop */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 14
          }} className="scratch-grid">
            {[
              { emoji: "🎤", title: "Arpej Karaoke", desc: "Sahne senin!", bg: "linear-gradient(135deg, #FF0080 0%, #7928CA 100%)", shine: "rgba(255,0,128,0.3)" },
              { emoji: "🎨", title: "Festival Makyajı", desc: "Renklerini yansıt!", bg: "linear-gradient(135deg, #FF6B35 0%, #F7C59F 100%)", shine: "rgba(255,107,53,0.3)" },
              { emoji: "💦", title: "Su Savaşı", desc: "Serinle, eğlen!", bg: "linear-gradient(135deg, #00C9FF 0%, #0066cc 100%)", shine: "rgba(0,201,255,0.3)" },
              { emoji: "🌈", title: "Color Throw", desc: "Renkleri uçur!", bg: "linear-gradient(135deg, #FF0078 0%, #FF8A00 100%)", shine: "rgba(255,0,120,0.3)" },
              { emoji: "📝", title: "Anı Duvarı", desc: "İzini bırak!", bg: "linear-gradient(135deg, #1A2980 0%, #26D0CE 100%)", shine: "rgba(38,208,206,0.3)" },
              { emoji: "🥽", title: "VR Teknoloji", desc: "Sanal dünyaya gir!", bg: "linear-gradient(135deg, #CB356B 0%, #BD3F32 100%)", shine: "rgba(203,53,107,0.3)" },
              { emoji: "🏹", title: "Okçuluk Meydanı", desc: "Hedefini vur!", bg: "linear-gradient(135deg, #F09819 0%, #EDDE5D 100%)", shine: "rgba(240,152,25,0.3)" },
              { emoji: <SvgFoosball />, title: "Langırt Turnuvası", desc: "Şampiyon ol!", bg: "linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)", shine: "rgba(255,65,108,0.3)" },
              { emoji: "🎮", title: "Dev Oyunlar", desc: "Takımını kur!", bg: "linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)", shine: "rgba(71,118,230,0.3)" },
              { emoji: "🎁", title: "Sürpriz Aktivite", desc: "Her an sürpriz!", bg: "linear-gradient(135deg, #00B4DB 0%, #0083B0 100%)", shine: "rgba(0,180,219,0.3)" },
            ].map((act, idx) => (
              <div key={act.title} style={{ borderRadius: 20, boxShadow: `0 8px 32px ${act.shine}` }}>
                <ScratchCard
                  width="100%"
                  height="100%"
                  onClear={() => {
                    // Send GA4 Event
                    if (typeof window !== "undefined" && (window as any).gtag) {
                      (window as any).gtag('event', 'scratch_card', {
                        card_name: act.title
                      });
                    }
                    // Send Meta Pixel Event (ViewContent with title as content_name)
                    if (typeof window !== "undefined" && (window as any).fbq) {
                      (window as any).fbq('track', 'ViewContent', {
                        content_name: act.title,
                        content_category: 'Festival Deneyimi'
                      });
                    }
                  }}
                >
                  <div style={{
                    width: "100%", height: "100%", background: act.bg, borderRadius: 20,
                    display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
                    textAlign: "center", padding: "20px 12px",
                    position: "relative", overflow: "hidden", minHeight: 160
                  }}>
                    {/* Shine overlay */}
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0, height: "50%",
                      background: "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 100%)",
                      borderRadius: "20px 20px 0 0", zIndex: 0
                    }} />
                    {/* Big emoji */}
                    <div style={{
                      fontSize: typeof act.emoji === "string" ? 44 : undefined,
                      lineHeight: 1, marginBottom: 10, zIndex: 1,
                      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 44
                    }}>
                      {act.emoji}
                    </div>
                    {/* Title — bubble/rounded font */}
                    <div style={{
                      fontSize: "clamp(13px, 3.5vw, 16px)", fontWeight: 900, color: "white", zIndex: 1,
                      lineHeight: 1.25, letterSpacing: "-0.01em", whiteSpace: "pre-line",
                      fontFamily: "'Nunito', 'Outfit', 'Varela Round', system-ui, sans-serif",
                      textShadow: "0 2px 8px rgba(0,0,0,0.4)"
                    }}>
                      {act.title}
                    </div>
                    {/* Desc */}
                    <div style={{
                      fontSize: "clamp(10px, 2.5vw, 12px)", color: "rgba(255,255,255,0.8)", zIndex: 1,
                      marginTop: 4, fontWeight: 600,
                      fontFamily: "'Nunito', 'Outfit', system-ui, sans-serif"
                    }}>
                      {act.desc}
                    </div>
                    {/* Bottom sparkle dots */}
                    <div style={{ position: "absolute", bottom: 10, right: 14, display: "flex", gap: 4, zIndex: 1 }}>
                      {[0,1,2].map(d => (
                        <div key={d} style={{
                          width: 5, height: 5, borderRadius: "50%",
                          background: "rgba(255,255,255,0.5)",
                          transform: `scale(${1 - d * 0.2})`
                        }} />
                      ))}
                    </div>
                  </div>
                </ScratchCard>
              </div>
            ))}
          </div>

          {/* Hint bar */}
          <div style={{
            marginTop: 24, textAlign: "center", display: "flex", alignItems: "center",
            justifyContent: "center"
          }}>
            <p style={{
              fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.05em", textTransform: "uppercase"
            }}>
              Kartları kazı, sürprizi keşfet!
            </p>
          </div>
        </div>
      </section>

      <Marquee text="KONYA EXTREME VE DOĞA PARK • GÜVENLİ & MACERA DOLU ALAN" bg="var(--ink3)" color="var(--cyan)" />

      {/* ══════════════════════════════════════════════════════════
          ALAN & YERLEŞİM — dark bg, 3-col facts
      ══════════════════════════════════════════════════════════ */}
      <section id="alan" className="res-section" style={{
        background: "var(--ink2)",
        position: "relative", overflow: "hidden", minHeight: "100dvh", display: "flex", flexDirection: "column", justifyContent: "center"
      }}>

        <div className="blob blob-grad-2 anim-blob2"
          style={{
            width: 600, height: 600, top: "50%", right: -200,
            transform: "translateY(-50%)", opacity: 0.1
          }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 32,
            flexWrap: "wrap",
            marginBottom: 56
          }}>
            <div style={{ maxWidth: 650 }}>
              <span className="pill pill-cyan" style={{ marginBottom: 16, display: "inline-flex" }}>
                Meram / Konya
              </span>
              <h2 style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900,
                color: "white", lineHeight: 1.05
              }}>
                <span className="g-cool">Konya Extreme</span>
                <br />ve Doğa Park
              </h2>
              <p className="text-muted-dark" style={{ fontSize: 16, marginTop: 14, maxWidth: 520 }}>
                Konya&apos;nın en güvenli ve kapsamlı festival alanı.
                5.000+ kişilik kapasitesiyle renklerin, müziğin ve eğlencenin buluştuğu macera parkı.
              </p>
            </div>
            <div className="logo-wavy-bg" style={{
              flexShrink: 0,
              padding: "24px 32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: "100%",
              width: 320
            }}>
              <img
                src="/images/logo_transparent.webp"
                alt="Konya Extreme ve Doğa Park Logo"
                loading="lazy"
                decoding="async"
                style={{ width: "100%", height: "auto", maxHeight: 110, objectFit: "contain" }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
            {[
              { svg: <SvgMic color="var(--orange)" />, t: "Ana Sahne", s: "Dev sahne, ses & ışık şov", c: "var(--orange)" },
              { svg: <SvgHeadphones color="var(--pink)" />, t: "Yan Sahne", s: "DJ & akustik performanslar", c: "var(--pink)" },
              { svg: <SvgPalette color="var(--purple)" />, t: "Color Throw", s: "Saat başı renk seansları", c: "var(--purple)" },
              { svg: <SvgFoodDrink color="var(--cyan)" />, t: "Yemek & İçecek", s: "Geniş food court alanı", c: "var(--cyan)" },
              { svg: <SvgSponsorGame color="var(--blue)" />, t: "Sponsor & Oyun", s: "Marka aktivasyonları", c: "var(--blue)" },
              { svg: <SvgShield color="var(--yellow)" />, t: "Güvenli Giriş", s: "Bilet & kimlik kontrol", c: "var(--yellow)" },
            ].map(a => (
              <div key={a.t} className="card-w" style={{
                padding: "24px 20px",
                background: `linear-gradient(135deg, color-mix(in srgb, ${a.c} 12%, rgba(255,255,255,0.92)), color-mix(in srgb, ${a.c} 3%, rgba(255,255,255,0.96))), url('/images/color_smoke_bg.webp')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: `1px solid color-mix(in srgb, ${a.c} 25%, rgba(255,255,255,0.4))`,
                boxShadow: `0 4px 20px color-mix(in srgb, ${a.c} 8%, transparent)`,
                transition: "all 0.3s ease"
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `color-mix(in srgb, ${a.c} 55%, rgba(255,255,255,0.7))`;
                  e.currentTarget.style.boxShadow = `0 12px 36px color-mix(in srgb, ${a.c} 22%, transparent)`;
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.background = `linear-gradient(135deg, color-mix(in srgb, ${a.c} 18%, rgba(255, 255, 255, 0.88)), color-mix(in srgb, ${a.c} 6%, rgba(255, 255, 255, 0.92))), url('/images/color_smoke_bg.webp')`;
                  e.currentTarget.style.backgroundSize = "cover";
                  e.currentTarget.style.backgroundPosition = "center";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = `color-mix(in srgb, ${a.c} 25%, rgba(255,255,255,0.4))`;
                  e.currentTarget.style.boxShadow = `0 4px 20px color-mix(in srgb, ${a.c} 8%, transparent)`;
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.background = `linear-gradient(135deg, color-mix(in srgb, ${a.c} 12%, rgba(255,255,255,0.92)), color-mix(in srgb, ${a.c} 3%, rgba(255,255,255,0.96))), url('/images/color_smoke_bg.webp')`;
                  e.currentTarget.style.backgroundSize = "cover";
                  e.currentTarget.style.backgroundPosition = "center";
                }}
              >
                <div style={{
                  marginBottom: 14, display: "flex", alignItems: "center",
                  width: 48, height: 48, borderRadius: 14,
                  background: `color-mix(in srgb, ${a.c} 12%, white)`,
                  boxShadow: `0 0 20px color-mix(in srgb, ${a.c} 25%, transparent)`,
                  justifyContent: "center"
                }}>
                  {a.svg}
                </div>
                <div style={{ fontWeight: 900, fontSize: 14, color: a.c === "var(--cyan)" ? "#0088cc" : (a.c === "var(--yellow)" ? "#b38600" : a.c), marginBottom: 4 }}>{a.t}</div>
                <div className="text-muted-light" style={{ fontSize: 12, color: "#4b4b75", lineHeight: 1.5 }}>{a.s}</div>
              </div>
            ))}
          </div>

          {/* ── Google Maps ─────────────────────────────────── */}
          <div style={{
            marginTop: 56, borderRadius: 24, overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 0 60px rgba(0,204,255,0.12), 0 0 0 1px rgba(255,255,255,0.05)"
          }}>

            {/* Map header */}
            <div style={{
              background: "rgba(255,255,255,0.04)", padding: "18px 28px",
              display: "flex", alignItems: "center", gap: 14,
              borderBottom: "1px solid rgba(255,255,255,0.07)"
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                padding: 3
              }}>
                <img
                  src="/images/logo_transparent.webp"
                  alt="Konya Extreme ve Doğa Park Logo"
                  loading="lazy"
                  decoding="async"
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
              <div>
                <div style={{ fontWeight: 900, fontSize: 15, color: "white" }}>Konya Extreme ve Doğa Park</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>Karahüyük, Meram, Konya — Festival Alanı</div>
              </div>
              <a href="https://www.google.com/maps/place/Konya+Extreme+Ve+Do%C4%9Fa+Park/@38.0050776,32.5127645,17z"
                target="_blank" rel="noopener noreferrer"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    if ((window as any).fbq) {
                      (window as any).fbq('track', 'FindLocation', { content_name: 'Google Maps Open' });
                    }
                    if ((window as any).ttq) {
                      (window as any).ttq.track('FindLocation', { content_name: 'Google Maps Open' });
                    }
                  }
                }}
                style={{
                  marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 8,
                  background: "linear-gradient(135deg, var(--cyan), var(--blue))",
                  color: "white", textDecoration: "none",
                  padding: "9px 18px", borderRadius: 10, fontSize: 12, fontWeight: 800,
                  boxShadow: "0 4px 16px rgba(0,204,255,0.3)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  whiteSpace: "nowrap"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,204,255,0.45)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,204,255,0.3)";
                }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M15 3h6v6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="10" y1="14" x2="21" y2="3" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
                Google Maps&apos;te Aç
              </a>
            </div>

            {/* Embedded map */}
            <div style={{ position: "relative", width: "100%", height: 420 }}>
              <iframe
                title="Konya Extreme ve Doğa Park"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3143.802042794941!2d32.512764499999996!3d38.0050776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d08d8d8041e6db%3A0xc67e235b9dc9492f!2sKonya%20Extreme%20Ve%20Do%C4%9Fa%20Park!5e0!3m2!1str!2str!4v1781295410405!5m2!1str!2str"
                width="100%"
                height="420"
                style={{ border: 0, display: "block", filter: "invert(90%) hue-rotate(180deg) saturate(1.3) brightness(0.85)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          KAYIT FORMU — white bg
      ══════════════════════════════════════════════════════════ */}
      <section id="kayit" className="res-section" style={{
        background: "transparent", zIndex: 1,
        scrollMarginTop: 64, display: "flex", flexDirection: "column", justifyContent: "center"
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto", width: "100%" }}>
          <div className="res-card-large" style={{
            background: "linear-gradient(rgba(255, 255, 255, 0.86), rgba(255, 255, 255, 0.86)), url('/images/color_smoke_bg.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderRadius: 28,
            border: "1px solid rgba(255, 255, 255, 0.4)",
            boxShadow: "0 8px 48px rgba(0,0,0,0.07)",
            overflow: "hidden"
          }}>

            <div style={{
              height: 4, background:
                "linear-gradient(90deg, var(--orange), var(--red), var(--pink), var(--magenta), var(--purple), var(--blue), var(--cyan))"
            }} />

            <div style={{ padding: "32px 0 16px" }}>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <span className="pill pill-orange" style={{ marginBottom: 14, display: "inline-flex" }}>
                  Festival Biletleri
                </span>
                <h2 style={{
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 900,
                  color: "var(--ink)", marginBottom: 10
                }}>
                  Yerini Hemen Ayırt!
                </h2>
                <p className="text-muted-light" style={{ fontSize: 16, lineHeight: 1.6 }}>
                  Festival coşkusunu kaçırmamak için{" "}
                  <strong style={{ color: "var(--orange)" }}>indirimli dönem biletlerini</strong> tükenmeden al.
                </p>
              </div>

              <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                <a href="https://www.bubilet.com.tr/konya/etkinlik/konya-color-fest"
                  target="_blank" rel="noopener noreferrer"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      if ((window as any).fbq) {
                        (window as any).fbq('track', 'Purchase', { value: 350.00, currency: 'TRY' });
                      }
                      if ((window as any).ttq) {
                        (window as any).ttq.track('Purchase', { value: 350.00, currency: 'TRY' });
                      }
                      if ((window as any).gtag) {
                        (window as any).gtag('event', 'purchase', {
                          value: 350.00, currency: 'TRY',
                          items: [{ item_id: 'colorfest_ticket', item_name: 'ColorFest Konya Bilet', price: 350.00, quantity: 1 }]
                        });
                        (window as any).gtag('event', 'ticket_click', {
                          event_category: 'Engagement', event_label: 'Bubilet Ticket Click', value: 350.00, currency: 'TRY'
                        });
                      }
                    }
                  }}
                  style={{
                    display: "inline-flex", flexDirection: "row", alignItems: "center", gap: 12,
                    background: "var(--ink)", padding: "16px 36px", borderRadius: 16,
                    textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s",
                    boxShadow: "0 12px 32px rgba(0,0,0,0.15)"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.25)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.15)";
                  }}>
                  <img src="https://www.bubilet.com.tr/assets/images/logo.svg"
                    alt="Bubilet" loading="lazy" decoding="async" style={{ height: 20, filter: "brightness(0) invert(1)" }} />
                  <span style={{ fontSize: 14, fontWeight: 800, color: "white", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    Bubilet&apos;ten Bilet Al →
                  </span>
                </a>

                <a href="https://chat.whatsapp.com/Ky400yj96rz7wEtRGToWbx"
                  target="_blank" rel="noopener noreferrer"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      if ((window as any).fbq) {
                        (window as any).fbq('track', 'Contact', { content_name: 'WhatsApp Community Link Click' });
                      }
                      if ((window as any).ttq) {
                        (window as any).ttq.track('Contact', { content_name: 'WhatsApp Community Link Click' });
                      }
                      if ((window as any).gtag) {
                        (window as any).gtag('event', 'whatsapp_click', {
                          event_category: 'Engagement',
                          event_label: 'WhatsApp Community Link Click',
                          method: 'WhatsApp'
                        });
                      }
                    }
                  }}
                  className="btn btn-whatsapp-community"
                  style={{ padding: "16px 36px", borderRadius: 16, fontSize: 14, width: "100%", maxWidth: 340 }}>
                  <SvgWhatsapp color="white" />
                  <span>WhatsApp Topluluğumuza Katılın</span>
                </a>

                <p className="text-muted-light" style={{ fontSize: 12, textAlign: "center", lineHeight: 1.5, marginTop: 4 }}>
                  Tıklayarak Bubilet üzerinden güvenle satın alım yapabilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Marquee text="BİZE ULAŞIN • BİZE ULAŞIN • BİZE ULAŞIN" bg="var(--ink3)" color="var(--orange)" />

      {/* ══════════════════════════════════════════════════════════
          İLETİŞİM — dark bg
      ══════════════════════════════════════════════════════════ */}
      <section id="iletisim" className="res-section" style={{
        background: "var(--ink)",
        scrollMarginTop: 64, display: "flex", flexDirection: "column", justifyContent: "center"
      }}>
        <div style={{
          maxWidth: 900, margin: "0 auto", width: "100%",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 40, alignItems: "center"
        }}>

          <div>
            <span className="pill pill-orange" style={{ marginBottom: 16, display: "inline-flex" }}>
              Bize Ulaşın
            </span>
            <h2 style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 900,
              color: "white", lineHeight: 1.1, marginBottom: 24
            }}>
              <span className="g-warm">İletişim</span>
            </h2>
            <h3 style={{ fontWeight: 900, fontSize: 20, color: "white", marginBottom: 20 }}>
              Asım Uçar
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { svg: <SvgPhone color="var(--orange)" />, t: "0542 228 68 12", h: "tel:+905422286812", bg: "var(--orange)", trackingType: 'phone' },
                { svg: <SvgWhatsapp color="#25D366" />, t: "WhatsApp Destek", h: "https://wa.me/905422286812?text=Merhaba,%20Colorfest%20biletleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.", bg: "#25D366", trackingType: 'whatsapp_support' },
                { svg: <SvgWhatsapp color="#25D366" />, t: "WhatsApp Topluluğumuz", h: "https://chat.whatsapp.com/Ky400yj96rz7wEtRGToWbx", bg: "#128C7E", trackingType: 'whatsapp_community' },
                { svg: <SvgInstagram color="var(--pink)" />, t: "@yks_eventt", h: "https://instagram.com/yks_eventt", bg: "#e6683c", trackingType: 'instagram' },
              ].map(c => (
                <a key={c.t} href={c.h} target="_blank" rel="noopener noreferrer"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      if (c.trackingType === "whatsapp_support") {
                        if ((window as any).fbq) {
                          (window as any).fbq('track', 'Contact', { content_name: 'WhatsApp Contact Link Click' });
                        }
                        if ((window as any).ttq) {
                          (window as any).ttq.track('Contact', { content_name: 'WhatsApp Contact Link Click' });
                        }
                        if ((window as any).gtag) {
                          (window as any).gtag('event', 'whatsapp_click', {
                            event_category: 'Engagement',
                            event_label: 'WhatsApp Contact Link Click',
                            method: 'WhatsApp'
                          });
                        }
                      } else if (c.trackingType === "whatsapp_community") {
                        if ((window as any).fbq) {
                          (window as any).fbq('track', 'Contact', { content_name: 'WhatsApp Community Link Click' });
                        }
                        if ((window as any).ttq) {
                          (window as any).ttq.track('Contact', { content_name: 'WhatsApp Community Link Click' });
                        }
                        if ((window as any).gtag) {
                          (window as any).gtag('event', 'whatsapp_click', {
                            event_category: 'Engagement',
                            event_label: 'WhatsApp Community Link Click',
                            method: 'WhatsApp'
                          });
                        }
                      }
                    }
                  }}
                  className="text-muted-dark"
                  style={{
                    display: "flex", gap: 14, alignItems: "center",
                    fontSize: 14, textDecoration: "none", transition: "color .2s"
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--orange)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}>
                  <span style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    background: `color-mix(in srgb, ${c.bg} 20%, #0d0d1a)`,
                    boxShadow: `0 0 12px color-mix(in srgb, ${c.bg} 35%, transparent)`
                  }}>
                    {c.svg}
                  </span>
                  <span style={{ fontWeight: 600 }}>{c.t}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Dark info card */}
          <div className="res-card-medium" style={{
            background: "var(--ink3)", borderRadius: 24,
            border: "1px solid rgba(255,255,255,0.07)",
            textAlign: "center", position: "relative", overflow: "hidden"
          }}>
            <div className="blob blob-grad-3 anim-blob"
              style={{ width: 200, height: 200, bottom: -60, right: -60, opacity: 0.2 }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ fontSize: 20, fontWeight: 900, color: "white", marginBottom: 6 }}>
                ColorFest Konya 2026
              </p>
              <p className="text-muted-dark" style={{ fontSize: 13, marginBottom: 20 }}>
                21 Haziran • Konya Extreme ve Doğa Park
              </p>
              <div style={{
                height: 2, background:
                  "linear-gradient(90deg, var(--orange), var(--pink), var(--purple), var(--cyan))",
                borderRadius: 2, marginBottom: 20
              }} />
              <p style={{ fontSize: 14, fontWeight: 700 }} className="g-warm">
                Gerçek bir festival deneyimine<br />hazır mısın Konya?
              </p>
            </div>
          </div>

          {/* Made by grove */}
          <div style={{
            gridColumn: "1 / -1",
            textAlign: "center",
            marginTop: 40,
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: 24,
            fontSize: 13,
            color: "rgba(255, 255, 255, 0.4)"
          }}>
            Made by{" "}
            <a href="https://grovemediacreative.com.tr"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--orange)",
                fontWeight: 700,
                textDecoration: "none",
                transition: "color 0.2s"
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--cyan)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--orange)")}
            >
              grove
            </a>
          </div>

        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a href="https://wa.me/905422286812?text=Merhaba,%20Colorfest%20biletleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          if (typeof window !== "undefined") {
            if ((window as any).fbq) {
              (window as any).fbq('track', 'Contact', { content_name: 'WhatsApp Floating Click' });
            }
            if ((window as any).ttq) {
              (window as any).ttq.track('Contact', { content_name: 'WhatsApp Floating Click' });
            }
            if ((window as any).gtag) {
              (window as any).gtag('event', 'whatsapp_click', {
                event_category: 'Engagement',
                event_label: 'WhatsApp Floating Click',
                method: 'WhatsApp'
              });
            }
          }
        }}
        style={{
          position: "fixed",
          bottom: 30,
          right: 30,
          width: 60,
          height: 60,
          backgroundColor: "#25D366",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 16px rgba(37, 211, 102, 0.4)",
          zIndex: 9998,
          transition: "all 0.3s ease",
          animation: "pulse-whatsapp 2s infinite"
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(37, 211, 102, 0.6)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 16px rgba(37, 211, 102, 0.4)";
        }}
      >
        <svg width="34" height="34" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.709 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

    </div>
  );
}
