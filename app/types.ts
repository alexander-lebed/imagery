// Types for Unsplash API responses
import { createApi } from 'unsplash-js';

type ApiReturnType = ReturnType<typeof createApi>;

type User = {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  portfolio_url: string;
  bio: string;
  location: string;
  total_likes: number;
  total_photos: number;
  total_collections: number;
  profile_image: {
    small: string;
    medium: string;
    large: string;
  };
  links: {
    self: string;
    html: string;
    photos: string;
    likes: string;
    portfolio: string;
  };
};

type CoverPhoto = {
  id: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  likes: number;
  liked_by_user: boolean;
  description: string;
  user: User;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
  };
};

export type CollectionResponse = {
  id: number;
  title: string;
  description: string;
  published_at: string;
  last_collected_at: string;
  updated_at: string;
  featured: boolean;
  total_photos: number;
  private: boolean;
  share_key: string;
  cover_photo: CoverPhoto;
  user: User;
  links: {
    self: string;
    html: string;
    photos: string;
  };
};

export type CollectionsResponse = {
  total: number;
  results: Array<{
    id: number;
    title: string;
    description: string;
    published_at: string;
    last_collected_at: string;
    updated_at: string;
    total_photos: number;
    private: boolean;
    share_key: string;
    cover_photo: CoverPhoto;
    user: User;
    links: {
      self: string;
      html: string;
      photos: string;
      related: string;
    };
  }>;
};

export type PhotoResponse = Awaited<ReturnType<ApiReturnType['photos']['get']>>['response'];

export type PhotosResponse = Awaited<ReturnType<ApiReturnType['search']['getPhotos']>>['response'];
