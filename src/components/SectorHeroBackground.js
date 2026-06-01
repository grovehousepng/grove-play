'use client';

import { useEffect, useRef } from 'react';

// Sector-specific icon symbols
const sectorIcons = {
    'guvenlik-sistemleri': ['🔒', '🛡️', '📹', '🔑', '🔐'],
    'klima-servisleri': ['❄️', '🌡️', '💨', '☀️', '🌬️'],
    'hali-yikama': ['✨', '🧹', '💧', '🫧', '🧼'],
    'tesisatcilar': ['🔧', '💧', '🚿', '🔩', '🪠'],
    'cilingirler': ['🔑', '🔓', '🚪', '🏠', '🔐'],
    'elektrikciler': ['⚡', '💡', '🔌', '🔋', '⚙️'],
    'bocek-ilaclama': ['🐛', '🦟', '🧴', '🏠', '🛡️'],
    'cati-izolasyon': ['🏠', '🔨', '🧱', '🏗️', '⛑️'],
    'nakliye-firmalari': ['🚛', '📦', '🏠', '🚚', '📋'],
    'oto-kurtarici': ['🚗', '🔧', '🚨', '🛞', '🚙'],
    'rent-a-car': ['🚗', '🔑', '🏎️', '🚙', '📋'],
    'guzellik-merkezleri': ['✂️', '💅', '💄', '🪞', '✨'],
    'dis-klinikleri': ['🦷', '😁', '🏥', '✨', '💎'],
    'restoranlar': ['🍽️', '🍕', '👨‍🍳', '🥗', '☕'],
    'hukuk-burolari': ['⚖️', '📜', '🏛️', '📚', '🖊️'],
    'dugun-mekanlari': ['🎉', '💒', '💍', '🎊', '🌸'],
    'cam-balkon': ['🪟', '🏠', '🌇', '✨', '🏙️'],
    'tadilat-dekorasyon': ['🎨', '🔨', '🏠', '🖌️', '🪚'],
};

export default function SectorHeroBackground({ slug }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationId;
        let mouse = { x: -1000, y: -1000 };
        const icons = sectorIcons[slug] || ['⭐', '✨', '💫', '🌟', '⚡'];

        function resize() {
            const parent = canvas.parentElement;
            canvas.width = parent.offsetWidth;
            canvas.height = parent.offsetHeight;
        }
        resize();

        class FloatingIcon {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.baseX = this.x;
                this.baseY = this.y;
                this.icon = icons[Math.floor(Math.random() * icons.length)];
                this.size = Math.random() * 24 + 20; // 20-44px (Increased from 14-30px)
                this.opacity = Math.random() * 0.25 + 0.08; // subtle: 0.08-0.33
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.01;
                this.density = Math.random() * 30 + 1;
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.font = `${this.size}px sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(this.icon, 0, 0);
                ctx.restore();
            }

            update() {
                // Mouse/touch repulsion
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const maxDist = 120;
                const force = (maxDist - distance) / maxDist;

                if (distance < maxDist && distance > 0) {
                    this.x -= forceDirectionX * force * this.density * 0.6;
                    this.y -= forceDirectionY * force * this.density * 0.6;
                } else {
                    // Drift back slowly
                    if (this.x !== this.baseX) {
                        const ddx = this.x - this.baseX;
                        this.x -= ddx / 20;
                    }
                    if (this.y !== this.baseY) {
                        const ddy = this.y - this.baseY;
                        this.y -= ddy / 20;
                    }
                }

                // Gentle floating
                this.baseX += this.speedX;
                this.baseY += this.speedY;
                this.rotation += this.rotationSpeed;

                // Wrap around
                if (this.baseX > canvas.width + 30) this.baseX = -30;
                if (this.baseX < -30) this.baseX = canvas.width + 30;
                if (this.baseY > canvas.height + 30) this.baseY = -30;
                if (this.baseY < -30) this.baseY = canvas.height + 30;
            }
        }

        // Create icons - fewer for subtlety and performance
        const count = Math.min(Math.floor((canvas.width * canvas.height) / 35000), 25);
        const particles = [];
        for (let i = 0; i < count; i++) {
            particles.push(new FloatingIcon());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            animationId = requestAnimationFrame(animate);
        }
        animate();

        // Mouse events
        function handleMouseMove(e) {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        }
        function handleMouseLeave() {
            mouse.x = -1000;
            mouse.y = -1000;
        }
        // Touch events
        function handleTouchMove(e) {
            if (e.touches.length > 0) {
                const rect = canvas.getBoundingClientRect();
                mouse.x = e.touches[0].clientX - rect.left;
                mouse.y = e.touches[0].clientY - rect.top;
            }
        }
        function handleTouchEnd() {
            mouse.x = -1000;
            mouse.y = -1000;
        }

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
        canvas.addEventListener('touchend', handleTouchEnd);

        const resizeObserver = new ResizeObserver(() => {
            resize();
            // Re-spread particles on resize
            particles.forEach(p => {
                p.baseX = Math.random() * canvas.width;
                p.baseY = Math.random() * canvas.height;
                p.x = p.baseX;
                p.y = p.baseY;
            });
        });
        resizeObserver.observe(canvas.parentElement);

        return () => {
            cancelAnimationFrame(animationId);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            canvas.removeEventListener('touchmove', handleTouchMove);
            canvas.removeEventListener('touchend', handleTouchEnd);
            resizeObserver.disconnect();
        };
    }, [slug]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'auto',
                zIndex: 0,
            }}
        />
    );
}
