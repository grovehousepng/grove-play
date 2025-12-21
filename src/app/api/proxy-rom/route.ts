import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const romUrl = searchParams.get('url');

    if (!romUrl) {
        return NextResponse.json({ error: 'Missing rom url' }, { status: 400 });
    }

    try {
        const response = await fetch(romUrl);

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch ROM' }, { status: response.status });
        }

        const blob = await response.blob();
        const headers = new Headers();
        headers.set('Content-Type', response.headers.get('Content-Type') || 'application/octet-stream');
        headers.set('Access-Control-Allow-Origin', '*'); // Allow emulator to access

        return new NextResponse(blob, {
            status: 200,
            headers,
        });
    } catch (error) {
        console.error('ROM Proxy Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
