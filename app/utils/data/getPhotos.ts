import { ColorId, ContentFilter, SearchOrderBy } from 'unsplash-js';
import { Orientation } from 'unsplash-js/src/types/request';
import unsplashApi from '@/app/api/unsplash-api';
import { PhotosResponse } from '@/app/types';
import { isClientSide } from '@/app/utils';
import { fetchApi } from './fetchApi';

type Params = {
  query: string;
  page?: number;
  perPage?: number;
  orderBy?: SearchOrderBy;
  color?: ColorId;
  orientation?: Orientation;
  contentFilter?: ContentFilter;
  collectionIds?: string[];
};

// Shared function to fetch photos that can be used on both server and client
export async function getPhotos({
  query,
  page,
  perPage,
  orderBy,
  color,
  orientation,
  contentFilter,
  collectionIds,
}: Params): Promise<PhotosResponse | undefined> {
  if (isClientSide()) {
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (page) params.append('page', page.toString());
    if (perPage) params.append('perPage', perPage.toString());
    if (orderBy) params.append('orderBy', orderBy);
    if (color) params.append('color', color);
    if (orientation) params.append('orientation', orientation);
    if (contentFilter) params.append('contentFilter', contentFilter);
    if (collectionIds && collectionIds.length > 0) {
      params.append('collectionIds', collectionIds.join(','));
    }
    return fetchApi(`/photos?${params.toString()}`);
  }
  return unsplashApi.search
    .getPhotos({
      query,
      page,
      perPage,
      orderBy,
      color,
      orientation,
      contentFilter,
      collectionIds,
    })
    .then(r => r.response);
}
