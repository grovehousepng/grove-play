const fs = require('fs');

const filePath = 'c:/Users/yucel/OneDrive/Desktop/colorfest (2)/src/app/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const arrayStart = `            {[
              { icon: <SvgMic color="white" />, bg: "var(--magenta)", title: "Arpej Karaoke", desc: "Sahne senin, mikrofon senin!" },`;
const arrayEnd = `            ].map(act => (`;

const startIndex = content.indexOf(arrayStart);
if (startIndex === -1) {
  console.log("Could not find arrayStart");
  process.exit(1);
}

const endIndex = content.indexOf(arrayEnd, startIndex);
if (endIndex === -1) {
  console.log("Could not find arrayEnd");
  process.exit(1);
}

const newArray = `            {[
              { 
                icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><rect x="8" y="2" width="8" height="13" rx="4" fill="url(#micGrad)"/><path d="M5 11v2a7 7 0 0 0 14 0v-2" stroke="white" strokeWidth="2.5" strokeLinecap="round"/><path d="M12 20v3M8 23h8" stroke="white" strokeWidth="2.5" strokeLinecap="round"/><defs><linearGradient id="micGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fff"/><stop offset="100%" stopColor="#ff0088"/></linearGradient></defs></svg>, 
                bg: "linear-gradient(135deg, #FF0080, #7928CA)", title: "Arpej Karaoke", desc: "Sahne senin, mikrofon senin!" 
              },
              { 
                icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12c0 2.76 1.12 5.26 2.93 7.07C6.59 14.5 9.1 12 12 12s5.41 2.5 7.07 7.07C20.88 17.26 22 14.76 22 12c0-5.52-4.48-10-10-10z" fill="url(#palGrad)" opacity="0.9"/><circle cx="8" cy="10" r="1.5" fill="white"/><circle cx="12" cy="7" r="1.5" fill="white"/><circle cx="16" cy="10" r="1.5" fill="white"/><circle cx="15" cy="17" r="2.5" fill="#1a0033"/><defs><linearGradient id="palGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ff9900"/><stop offset="100%" stopColor="#ff0044"/></linearGradient></defs></svg>, 
                bg: "linear-gradient(135deg, #FF4D4D, #F9CB28)", title: "Festival Makyajı & Yüz Boyama", desc: "Renklerini yansıt!" 
              },
              { 
                icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M12 2L4 6v6c0 4.97 3.5 9.25 8 10.93C16.5 21.25 20 16.97 20 12V6l-8-4z" fill="url(#shGrad)"/><path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><defs><linearGradient id="shGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#00ffcc"/><stop offset="100%" stopColor="#0066ff"/></linearGradient></defs></svg>, 
                bg: "linear-gradient(135deg, #00C9FF, #92FE9D)", title: "Su Savaşı", desc: "Serinle, eğlen, ıslan!" 
              },
              { 
                icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="5" fill="url(#sunGrad)"/><path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.536-7.071l-1.414 1.414M5.879 18.121l-1.414 1.414m14.142 0l-1.414-1.414M5.879 5.879L4.464 4.464" stroke="white" strokeWidth="2.5" strokeLinecap="round"/><defs><linearGradient id="sunGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ffeb3b"/><stop offset="100%" stopColor="#ff5722"/></linearGradient></defs></svg>, 
                bg: "linear-gradient(135deg, #FF0078, #FF8A00)", title: "Saat Başı Color Throw", desc: "Hep birlikte renkleri gökyüzüne bırak!" 
              },
              { 
                icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="white" strokeWidth="2.5"/><circle cx="12" cy="10" r="3" fill="url(#portGrad)"/><path d="M7 18c0-2.5 2.5-4 5-4s5 1.5 5 4" stroke="white" strokeWidth="2.5" strokeLinecap="round"/><defs><linearGradient id="portGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#e91e63"/><stop offset="100%" stopColor="#9c27b0"/></linearGradient></defs></svg>, 
                bg: "linear-gradient(135deg, #8A2387, #E94057)", title: "Kişiye Özel Portre", desc: "Unutulmaz bir anı seninle kalsın." 
              },
              { 
                icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" fill="url(#chatGrad)"/><path d="M9 12h6M9 8h6M9 16h4" stroke="white" strokeWidth="2" strokeLinecap="round"/><defs><linearGradient id="chatGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#00bcd4"/><stop offset="100%" stopColor="#3f51b5"/></linearGradient></defs></svg>, 
                bg: "linear-gradient(135deg, #1A2980, #26D0CE)", title: "Anı Duvarı", desc: "Düşüncelerini yaz, anılara bırak!" 
              },
              { 
                icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><rect x="2" y="7" width="20" height="10" rx="3" fill="url(#vrGrad)"/><path d="M8 17v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2" stroke="white" strokeWidth="2"/><circle cx="8" cy="12" r="2" fill="white"/><circle cx="16" cy="12" r="2" fill="white"/><defs><linearGradient id="vrGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ff5252"/><stop offset="100%" stopColor="#c51162"/></linearGradient></defs></svg>, 
                bg: "linear-gradient(135deg, #CB356B, #BD3F32)", title: "VR Teknolojisi", desc: "Sanal dünyaya adım at!" 
              },
              { 
                icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M12 3a9 9 0 0 0 0 18" stroke="url(#bowGrad)" strokeWidth="3" strokeLinecap="round"/><path d="M12 3v18" stroke="white" strokeWidth="1"/><path d="M3 12h17M17 9l3 3-3 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><defs><linearGradient id="bowGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ff9800"/><stop offset="100%" stopColor="#ffeb3b"/></linearGradient></defs></svg>, 
                bg: "linear-gradient(135deg, #F09819, #EDDE5D)", title: "Okçuluk", desc: "Hedefini vur!" 
              },
              { 
                icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="url(#targetGrad)" strokeWidth="2"/><circle cx="12" cy="12" r="6" stroke="white" strokeWidth="2"/><circle cx="12" cy="12" r="2" fill="white"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="white" strokeWidth="2" strokeLinecap="round"/><defs><linearGradient id="targetGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#00e676"/><stop offset="100%" stopColor="#1de9b6"/></linearGradient></defs></svg>, 
                bg: "linear-gradient(135deg, #11998E, #38EF7D)", title: "Poligon", desc: "Nişan al, hedefi vur!" 
              },
              { 
                icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" stroke="white" strokeWidth="2"/><line x1="8" y1="2" x2="8" y2="22" stroke="white" strokeWidth="2"/><line x1="16" y1="2" x2="16" y2="22" stroke="white" strokeWidth="2"/><circle cx="8" cy="8" r="1.5" fill="url(#langGrad)"/><circle cx="8" cy="16" r="1.5" fill="url(#langGrad)"/><circle cx="16" cy="12" r="1.5" fill="url(#langGrad)"/><defs><linearGradient id="langGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ff1744"/><stop offset="100%" stopColor="#ff9100"/></linearGradient></defs></svg>, 
                bg: "linear-gradient(135deg, #FF416C, #FF4B2B)", title: "Langırt Turnuvaları", desc: "Rekabet et, şampiyon ol!" 
              },
              { 
                icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M18 7H6C4.1 7 2.5 8.6 2.5 10.5v5C2.5 17.4 4.1 19 6 19c1.1 0 2-.6 2.5-1.5L9.7 15.5C10 15 10.6 14.5 11.2 14.5h1.6c.6 0 1.2.5 1.5 1L15.5 17.5C16 18.4 16.9 19 18 19c1.9 0 3.5-1.6 3.5-3.5v-5C21.5 8.6 19.9 7 18 7Z" fill="url(#gameGrad)"/><path d="M5.5 13H8.5M7 11.5V14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/><circle cx="15.5" cy="12" r="1" fill="white"/><circle cx="17.5" cy="14" r="1" fill="white"/><defs><linearGradient id="gameGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#651fff"/><stop offset="100%" stopColor="#2979ff"/></linearGradient></defs></svg>, 
                bg: "linear-gradient(135deg, #4776E6, #8E54E9)", title: "Dev Oyunlar", desc: "Takımını kur, kazan!" 
              },
              { 
                icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M12 2L15 9l7 1-5 5 1 7-7-4-7 4 1-7-5-5 7-1z" fill="url(#starGrad)"/><defs><linearGradient id="starGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#00e5ff"/><stop offset="100%" stopColor="#00b0ff"/></linearGradient></defs></svg>, 
                bg: "linear-gradient(135deg, #00B4DB, #0083B0)", title: "Sürpriz Aktiviteler", desc: "Günün her anı sürprizlerle dolu!" 
              },
`;

content = content.substring(0, startIndex) + newArray + content.substring(endIndex);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Updated array with better gradients and inline SVGs");
