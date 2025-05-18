'use client';

import { HydrationBoundary, DehydratedState } from '@tanstack/react-query';
import PhotosPreview from '@/app/components/PhotosPreview';
import { TOPICS } from '@/app/constants';

function HomeContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
      {TOPICS.map(topic => (
        <PhotosPreview key={topic} topic={topic} />
      ))}
    </div>
  );
}

export default function Home({ dehydratedState }: { dehydratedState: DehydratedState }) {
  // Rehydrate the state, making the prefetched data available to `useQuery` hooks
  return (
    <HydrationBoundary state={dehydratedState}>
      <HomeContent />
    </HydrationBoundary>
  );
}
