'use client';

import { useEffect } from 'react';

/**
 * Custom hook to enable spatial navigation (Arrow Keys) for TV remotes and keyboard users.
 * Targets elements with tabIndex={0} or focusable elements.
 */
export function useKeyNavigation() {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
            if (!keys.includes(e.key)) return;

            const activeElement = document.activeElement as HTMLElement;
            if (!activeElement) return;

            const focusable = Array.from(document.querySelectorAll('[tabindex="0"], a, button, input')) as HTMLElement[];
            if (focusable.length === 0) return;

            const index = focusable.indexOf(activeElement);
            const rect = activeElement.getBoundingClientRect();

            let nextElement: HTMLElement | null = null;
            let minDistance = Infinity;

            // Simple Spatial Navigation
            focusable.forEach(el => {
                if (el === activeElement) return;
                const nextRect = el.getBoundingClientRect();

                // Calculate directional distance
                let isPotential = false;
                if (e.key === 'ArrowRight' && nextRect.left >= rect.right) isPotential = true;
                if (e.key === 'ArrowLeft' && nextRect.right <= rect.left) isPotential = true;
                if (e.key === 'ArrowDown' && nextRect.top >= rect.bottom) isPotential = true;
                if (e.key === 'ArrowUp' && nextRect.bottom <= rect.top) isPotential = true;

                if (isPotential) {
                    const dist = Math.sqrt(
                        Math.pow(nextRect.left - rect.left, 2) +
                        Math.pow(nextRect.top - rect.top, 2)
                    );
                    if (dist < minDistance) {
                        minDistance = dist;
                        nextElement = el;
                    }
                }
            });

            if (nextElement) {
                e.preventDefault();
                (nextElement as HTMLElement).focus();
                // Ensure it scrolls into view if needed
                (nextElement as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);
}
