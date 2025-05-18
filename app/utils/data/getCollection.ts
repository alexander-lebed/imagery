import unsplashApi from '@/app/api/unsplash-api';
import { CollectionResponse } from '@/app/types';
import { isClientSide } from '@/app/utils';
import { fetchApi } from './fetchApi';

// Shared function to fetch collections that can be used on both server and client
export async function getCollection(id: string): Promise<CollectionResponse | undefined> {
  if (isClientSide()) {
    return fetchApi(`/collections/${id}`);
  }
  return unsplashApi.collections
    .get({
      collectionId: id,
    })
    .then(r => r.response);
}
