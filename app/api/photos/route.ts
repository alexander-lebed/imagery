import { NextRequest, NextResponse } from 'next/server';
import { ColorId, ContentFilter, SearchOrderBy } from 'unsplash-js';
import { Orientation } from 'unsplash-js/src/types/request';
import unsplashApi from '../unsplash-api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const query = searchParams.get('query') || '';
    const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string, 10) : 1;
    const perPage = searchParams.get('perPage')
      ? parseInt(searchParams.get('perPage') as string, 10)
      : 9;
    const orderBy = (searchParams.get('orderBy') as SearchOrderBy) || undefined;
    const color = (searchParams.get('color') as ColorId) || undefined;
    const orientation = (searchParams.get('orientation') as Orientation) || undefined;
    const contentFilter = (searchParams.get('contentFilter') as ContentFilter) || undefined;
    const collectionIds = searchParams.get('collectionIds')
      ? searchParams.get('collectionIds')?.split(',')
      : undefined;

    // If no query is provided, return an empty response
    if (!query) {
      return NextResponse.json({ results: [], total: 0, total_pages: 0 });
    }

    const result = await unsplashApi.search.getPhotos({
      query,
      page,
      perPage,
      orderBy,
      color,
      orientation,
      contentFilter,
      collectionIds,
    });
    if (result.errors) {
      return NextResponse.json({ errors: result.errors }, { status: 400 });
    }
    return NextResponse.json(result.response);
  } catch (error) {
    console.error('Error searching photos:', error);
    return NextResponse.json({ error: 'Failed to search photos' }, { status: 500 });
  }
}
