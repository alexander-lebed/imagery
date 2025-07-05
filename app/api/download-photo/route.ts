import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const downloadUrl = searchParams.get('url');

  if (!downloadUrl) {
    return NextResponse.json({ error: 'Download URL is required' }, { status: 400 });
  }

  const filename = searchParams.get('filename') || 'Imagery-photo';
  try {
    // Fetch the image
    const response = await fetch(downloadUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }
    const imageBlob = await response.blob();
    // Return the image with appropriate headers
    return new NextResponse(imageBlob, {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Download failed:', error);
    return NextResponse.json({ error: 'Failed to download image' }, { status: 500 });
  }
}
