'use client';

import { useEffect, Suspense, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function GtmTrackerInner() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const lastTrackedUrl = useRef('');

    useEffect(() => {
        if (pathname && typeof window !== 'undefined') {
            // Construct the full URL
            const url = window.location.origin + pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

            // Only track if the URL has actually changed
            if (url !== lastTrackedUrl.current) {
                lastTrackedUrl.current = url;

                // Add a small delay to ensure Next.js router has finished updating window.location
                setTimeout(() => {
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                        event: 'virtual_page_view',
                        page_url: window.location.href, // Get the absolute latest URL directly from the browser window
                        page_path: pathname
                    });
                }, 100);
            }
        }
    }, [pathname, searchParams]);

    return null; // This component doesn't render anything visible
}

export default function GtmTracker() {
    return (
        <Suspense fallback={null}>
            <GtmTrackerInner />
        </Suspense>
    );
}
