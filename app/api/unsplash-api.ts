import nodeFetch from 'node-fetch';
import { createApi } from 'unsplash-js';

// Initialize the Unsplash API client
const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY || '',
  fetch: nodeFetch as unknown as typeof fetch,
});

export default unsplashApi;
