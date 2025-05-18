import { NextRequest, NextResponse } from 'next/server';
import unsplashApi from '../../unsplash-api';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: photoId } = await params;
  if (!photoId) {
    return NextResponse.json({ error: 'Photo ID is required' }, { status: 400 });
  }
  try {
    const result = await unsplashApi.photos.get({
      photoId,
    });
    if (result.errors) {
      return NextResponse.json({ errors: result.errors }, { status: 400 });
    }
    return NextResponse.json(result.response);
  } catch (error) {
    console.error(`Error fetching photo with ID ${photoId}:`, error);
    return NextResponse.json({ error: 'Failed to fetch photo' }, { status: 500 });
  }
}
