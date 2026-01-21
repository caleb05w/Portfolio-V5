"use client"

import { useEffect, useRef } from 'react'

export default function HorizontalSmoothScroll({ containerRef }) {
    const animationFrameRef = useRef(null);
    const targetScrollRef = useRef(0);
    const currentVelocityRef = useRef(0);
    const isAnimatingRef = useRef(false);
    const smoothScrollFnRef = useRef(null);

    useEffect(() => {
        // Define smoothScroll function that can reference itself
        smoothScrollFnRef.current = () => {
            const container = containerRef?.current;
            if (!container) return;

            const current = container.scrollLeft;
            const target = targetScrollRef.current;
            const diff = target - current;
            const velocity = currentVelocityRef.current;

            // Improved easing: use a smoother easing function
            const ease = 0.1; // Lower = smoother but slower
            const damping = 0.88; // Velocity damping

            // Calculate new position with smooth easing
            const newPosition = current + diff * ease;
            const newVelocity = velocity * damping;

            // Update scroll position
            container.scrollLeft = newPosition;
            currentVelocityRef.current = newVelocity;

            // Continue animating if we're not close enough or still have velocity
            if (Math.abs(diff) > 0.5 || Math.abs(newVelocity) > 0.5) {
                isAnimatingRef.current = true;
                animationFrameRef.current = requestAnimationFrame(smoothScrollFnRef.current);
            } else {
                // Snap to final position
                container.scrollLeft = target;
                currentVelocityRef.current = 0;
                isAnimatingRef.current = false;
            }
        };
    }, [containerRef]);

    useEffect(() => {
        const container = containerRef?.current;
        if (!container) return;

        // Initialize target scroll position
        targetScrollRef.current = container.scrollLeft;

        const handleWheel = (e) => {
            // Convert vertical wheel to horizontal scroll
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                e.preventDefault();
                e.stopPropagation();

                const scrollAmount = e.deltaY * 1; // Adjust multiplier for sensitivity
                targetScrollRef.current += scrollAmount;

                // Clamp to bounds
                const maxScroll = container.scrollWidth - container.clientWidth;
                targetScrollRef.current = Math.max(0, Math.min(targetScrollRef.current, maxScroll));

                // Add velocity for momentum
                currentVelocityRef.current = scrollAmount * 0.5;

                // Start animation if not already running
                if (!isAnimatingRef.current && smoothScrollFnRef.current) {
                    isAnimatingRef.current = true;
                    animationFrameRef.current = requestAnimationFrame(smoothScrollFnRef.current);
                }
            }
        };

        container.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            container.removeEventListener('wheel', handleWheel);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [containerRef]);

    return null;
}

