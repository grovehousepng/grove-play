import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        // Clean filename: remove special chars, spaces to hyphens
        const filename = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, '-');

        // Determine upload directory based on file type (image vs rom)
        // Simple logic: if ext is jpg/png/webp -> images, else -> roms
        const isImage = /\.(jpg|jpeg|png|webp|gif)$/i.test(filename);
        const subDir = isImage ? 'images' : 'roms';

        const uploadDir = path.join(process.cwd(), 'public', subDir);

        // Ensure dir exists
        await mkdir(uploadDir, { recursive: true });

        const filePath = path.join(uploadDir, filename);
        await writeFile(filePath, buffer);

        // Return relative path
        const publicPath = `/${subDir}/${filename}`;

        return NextResponse.json({ success: true, url: publicPath });
    } catch (error) {
        console.error('Upload Error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
