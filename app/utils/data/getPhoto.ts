import unsplashApi from '@/app/api/unsplash-api';
import { PhotoResponse } from '@/app/types';
import { isClientSide } from '@/app/utils';
import { fetchApi } from './fetchApi';

// Shared function to fetch a single photo that can be used on both server and client
export async function getPhoto(id: string): Promise<PhotoResponse | undefined> {
  if (isClientSide()) {
    return fetchApi(`/photos/${id}`);
  }
  unsplashApi.photos
    .get({
      photoId: id,
    })
    .then(r => r.response);
}
