'use client';

import { Suspense } from 'react';
import { HydrationBoundary, DehydratedState } from '@tanstack/react-query';
import { TOPICS } from '@/app/constants';
import { PhotoCollage, Photos } from '@/app/features';
import { useDebouncedSearchParam } from '@/app/hooks';
import { Input } from '@/app/ui';

function HomeContent() {
  const [search, setSearch] = useDebouncedSearchParam('search');
  return (
    <div className="flex flex-col gap-6">
      <div className="sticky top-0 z-10 w-full pb-4 pt-8 bg-[var(--background)]">
        <div className="w-full max-w-2xl mx-auto">
          <Input
            type="text"
            aria-label="Search photos"
            placeholder="Search photos..."
            clearable
            value={search}
            onChange={e => setSearch(e.target.value)}
            onClear={() => setSearch('')}
          />
        </div>
      </div>

      {search ? (
        <Photos search={search} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-8">
          {TOPICS.map(topic => (
            <PhotoCollage key={topic} topic={topic} onClick={() => setSearch(topic)} />
          ))}
        </div>
      )}
    </div>
  );
}

// Loading fallback for the suspense boundary
function HomeLoading() {
  return (
    <div className="flex justify-center items-center h-32">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      <p className="ml-2 text-gray-600">Loading...</p>
    </div>
  );
}

export default function Home({ dehydratedState }: { dehydratedState: DehydratedState }) {
  // Rehydrate the state, making the prefetched data available to `useQuery` hooks
  return (
    <HydrationBoundary state={dehydratedState}>
      <Suspense fallback={<HomeLoading />}>
        <HomeContent />
      </Suspense>
    </HydrationBoundary>
  );
}
