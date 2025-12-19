import { NextResponse } from 'next/server';

const REST_URL = 'https://dev-grove-games.pantheonsite.io/wp-json/grove-api/v1';

export async function POST(request: Request) {
    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
        }

        // Server-to-Server call to WordPress (Bypasses Browser CORS)
        const wpRes = await fetch(`${REST_URL}/play/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Optional: Add authentication header if needed later
            },
            cache: 'no-store'
        });

        if (!wpRes.ok) {
            console.error('[API Proxy] WP returned error:', wpRes.status, wpRes.statusText);
            return NextResponse.json({ error: 'Failed to update WP' }, { status: wpRes.status });
        }

        const data = await wpRes.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error('[API Proxy] Internal Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
