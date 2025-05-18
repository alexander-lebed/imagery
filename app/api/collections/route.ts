import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from 'unsplash-js/src/helpers/response';
import { CollectionsResponse } from '@/app/types';
import unsplashApi from '../unsplash-api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const page = searchParams.get('page')
      ? parseInt(searchParams.get('page') as string, 10)
      : undefined;
    const perPage = searchParams.get('perPage')
      ? parseInt(searchParams.get('perPage') as string, 10)
      : undefined;
    const result: ApiResponse<CollectionsResponse> = await unsplashApi.collections.list({
      page,
      perPage,
    });
    if (result.errors) {
      return NextResponse.json({ errors: result.errors }, { status: 400 });
    }
    return NextResponse.json(result.response);
  } catch (error) {
    console.error('Error fetching collections:', error);
    return NextResponse.json({ error: 'Failed to fetch collections' }, { status: 500 });
  }
}
