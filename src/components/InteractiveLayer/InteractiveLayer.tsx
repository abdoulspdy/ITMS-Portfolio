import React, { useMemo, useRef, useEffect } from 'react';
import './InteractiveGrid.css'; // Make sure to import the CSS

interface GridConfig {
    rows: number;
    cols: number;
}

const InteractiveGrid: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Configuration (Could be props if you want to make it dynamic)
    const config: GridConfig = {
        rows: 10,
        cols: 20
    };

    // Generate the grid items only once using useMemo
    const gridItems = useMemo(() => {
        return Array.from({ length: config.rows * config.cols }).map((_, i) => ({
            id: i,
            style: {
                '--grade': Math.floor(Math.random() * 12 - 6),
                '--opacity': Math.min(Math.random(), 0.2),
                '--hue': Math.floor(Math.random() * 30),
            } as React.CSSProperties,
        }));
    }, [config.rows, config.cols]);

    // Handle Touch/Pointer interaction for mobile
    // This replicates the logic: "if (window.matchMedia('(hover: none)...')..."
    useEffect(() => {
        const grid = containerRef.current;
        if (!grid) return;

        const handlePointerMove = (e: PointerEvent) => {
            // Only run this logic on touch devices or coarse pointers
            if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
                const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;

                // Remove active state from previous
                const prev = grid.querySelector('[data-hover="true"]');
                if (prev && prev !== target) {
                    prev.removeAttribute('data-hover');
                }

                // Add active state to current if it's a grid item
                if (target && target.parentNode === grid) {
                    target.setAttribute('data-hover', 'true');
                }
            }
        };

        const handlePointerLeave = () => {
            const prev = grid.querySelector('[data-hover="true"]');
            if (prev) prev.removeAttribute('data-hover');
        };

        grid.addEventListener('pointermove', handlePointerMove);
        grid.addEventListener('pointerleave', handlePointerLeave);

        return () => {
            grid.removeEventListener('pointermove', handlePointerMove);
            grid.removeEventListener('pointerleave', handlePointerLeave);
        };
    }, []);

    return (
        <div className="grid-wrapper">
            <main className="grid-container">
                <div
                    ref={containerRef}
                    className="grid"
                    style={{
                        '--rows': config.rows,
                        '--cols': config.cols
                    } as React.CSSProperties}
                >
                    {gridItems.map((item) => (
                        <div key={item.id} style={item.style}>
                            +
                        </div>
                    ))}
                </div>
            </main>

            {/* Jhey Bear Link */}
            <a
                aria-label="Follow Jhey"
                className="fixed top-4 left-4 w-12 h-12 opacity-80 hover:opacity-100 transition-opacity text-[canvasText]"
                href="https://twitter.com/intent/follow?screen_name=jh3yy"
                target="_blank"
                rel="noreferrer noopener"
                style={{ color: 'var(--color-canvas-text)' }} // explicit color fallback
            >
                <svg
                    className="w-full h-full"
                    viewBox="0 0 969 955"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        cx="161.191"
                        cy="320.191"
                        r="133.191"
                        stroke="currentColor"
                        strokeWidth="20"
                    />
                    <circle
                        cx="806.809"
                        cy="320.191"
                        r="133.191"
                        stroke="currentColor"
                        strokeWidth="20"
                    />
                    <circle cx="695.019" cy="587.733" r="31.4016" fill="currentColor" />
                    <circle cx="272.981" cy="587.733" r="31.4016" fill="currentColor" />
                    <path
                        d="M564.388 712.083C564.388 743.994 526.035 779.911 483.372 779.911C440.709 779.911 402.356 743.994 402.356 712.083C402.356 680.173 440.709 664.353 483.372 664.353C526.035 664.353 564.388 680.173 564.388 712.083Z"
                        fill="currentColor"
                    />
                    <rect
                        x="310.42"
                        y="448.31"
                        width="343.468"
                        height="51.4986"
                        fill="#FF1E1E"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M745.643 288.24C815.368 344.185 854.539 432.623 854.539 511.741H614.938V454.652C614.938 433.113 597.477 415.652 575.938 415.652H388.37C366.831 415.652 349.37 433.113 349.37 454.652V511.741L110.949 511.741C110.949 432.623 150.12 344.185 219.845 288.24C289.57 232.295 384.138 200.865 482.744 200.865C581.35 200.865 675.918 232.295 745.643 288.24Z"
                        fill="currentColor"
                    />
                </svg>
            </a>
        </div>
    );
};

export default InteractiveGrid;