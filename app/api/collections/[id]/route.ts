import { NextRequest, NextResponse } from 'next/server';
import unsplashApi from '../../unsplash-api';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: collectionId } = await params;
  if (!collectionId) {
    return NextResponse.json({ error: 'Collection ID is required' }, { status: 400 });
  }
  try {
    const result = await unsplashApi.collections.get({
      collectionId,
    });
    if (result.errors) {
      return NextResponse.json({ errors: result.errors }, { status: 400 });
    }
    return NextResponse.json(result.response);
  } catch (error) {
    console.error(`Error fetching collection with ID ${collectionId}:`, error);
    return NextResponse.json({ error: 'Failed to fetch collection' }, { status: 500 });
  }
}
