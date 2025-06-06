import { FC } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { Photo } from '@/app/components/ui';
import { useDebouncedValue } from '@/app/hooks';
import { getPhotos } from '@/app/utils/data';

type Props = {
  search: string;
};

const perPage = 27;

const Photos: FC<Props> = ({ search }) => {
  const debouncedSearch = useDebouncedValue(search);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['getPhotos', debouncedSearch, perPage],
    queryFn: () => getPhotos({ query: debouncedSearch, perPage }),
    enabled: !!debouncedSearch, // don't fetch if `search` is empty
    placeholderData: keepPreviousData,
  });

  const photos = data?.results || [];

  if (!debouncedSearch) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="py-8 text-center">
        <div
          data-testid="loading-spinner"
          className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"
        ></div>
        <p className="mt-2 text-gray-600">Loading photos...</p>
      </div>
    );
  }

  if (photos.length === 0 || isError) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-600">No photos found</p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-8"
      data-testid="photos-grid"
    >
      {photos.map(photo => (
        <Photo key={photo.id} photo={photo} />
      ))}
    </div>
  );
};

export default Photos;
