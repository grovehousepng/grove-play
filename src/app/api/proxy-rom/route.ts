import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const romUrl = searchParams.get('url');

    if (!romUrl) {
        return NextResponse.json({ error: 'Missing rom url' }, { status: 400 });
    }

    try {
        let response = await fetch(romUrl);

        // Auto-fix common path typo: wp-upload -> wp-content/uploads
        if (!response.ok && response.status === 404 && romUrl.includes('/wp-upload/')) {
            const fixedUrl = romUrl.replace('/wp-upload/', '/wp-content/uploads/');
            console.log(`[Proxy] Fixing 404 URL: ${romUrl} -> ${fixedUrl}`);
            response = await fetch(fixedUrl);
        }

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch ROM' }, { status: response.status });
        }

        const blob = await response.blob();

        // Create headers object
        const headers = new Headers();

        // STRICTLY FORCE binary type. Do not use the upstream content-type if it is text/plain.
        headers.set('Content-Type', 'application/octet-stream');
        headers.set('Access-Control-Allow-Origin', '*');
        // EmulatorJS specifically looks for this to handle large files properly if ranges were supported, 
        // but for blobs it helps to have correct lengths.
        const len = response.headers.get('Content-Length');
        if (len) headers.set('Content-Length', len);

        return new NextResponse(blob, {
            status: 200,
            headers: headers,
        });
    } catch (error) {
        console.error('ROM Proxy Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
