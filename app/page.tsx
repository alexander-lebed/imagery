import { dehydrate } from '@tanstack/react-query';
import { TOPICS } from '@/app/constants';
import { getQueryClient } from '@/app/utils/data';
import { getPhotos } from '@/app/utils/data';
import Home from './Home';

export default async function Page() {
  const queryClient = getQueryClient();

  // Prefetch photos on the server side
  await Promise.all(
    TOPICS.map(topic =>
      queryClient.prefetchQuery({
        queryKey: ['getPhotos', topic],
        queryFn: () => getPhotos({ query: topic, perPage: 3 }),
      })
    )
  );

  const dehydratedState = dehydrate(queryClient);
  return <Home dehydratedState={dehydratedState} />;
}
