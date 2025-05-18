import unsplashApi from '@/app/api/unsplash-api';
import { CollectionsResponse } from '@/app/types';
import { isClientSide } from '@/app/utils';
import { fetchApi } from './fetchApi';

// Shared function to fetch collections that can be used on both server and client
export async function getCollections(
  page = 1,
  perPage = 9
): Promise<CollectionsResponse | undefined> {
  if (isClientSide()) {
    return fetchApi(`/collections?page=${page}&perPage=${perPage}`);
  }
  // We call unsplashApi directly since at this point API routes are not available yet (the app is not running)
  return unsplashApi.collections
    .list({
      page,
      perPage,
    })
    .then(r => r.response);
}
