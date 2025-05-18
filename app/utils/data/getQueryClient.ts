import { cache } from 'react';
import { QueryClient } from '@tanstack/react-query';

// Create a new QueryClient instance for each request
// This is important for SSR to avoid sharing state between requests
export const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000, // 1 minute
          refetchOnWindowFocus: false,
        },
      },
    })
);
