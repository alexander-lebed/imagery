import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { getPhotos } from '@/app/utils/data';

type Props = {
  topic: string;
};

const PhotosPreview: FC<Props> = ({ topic }) => {
  const { data: photos, isLoading } = useQuery({
    queryKey: ['getPhotos', topic],
    queryFn: () => getPhotos({ query: topic, perPage: 3 }),
  });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        <div
          data-testid="loading-skeleton"
          className="animate-pulse bg-gray-200 h-48 rounded-lg"
        ></div>
        <h3 className="text-sm font-medium">{topic}</h3>
      </div>
    );
  }

  if (!photos || !photos.results || photos.results.length === 0) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-center text-gray-500 h-48 rounded-lg bg-gray-100">
          No photos found for {topic}
        </div>
        <h3 className="text-sm font-medium">{topic}</h3>
      </div>
    );
  }

  // Get up to 3 photos
  const displayPhotos = photos.results.slice(0, 3);

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-3 gap-1 h-48 overflow-hidden rounded-lg">
        {displayPhotos.map((photo, index) => (
          <div key={photo.id} className={`relative ${index === 0 ? 'col-span-2 row-span-2' : ''}`}>
            <Image
              className="object-cover"
              alt={photo.alt_description || topic}
              fill
              src={photo.urls.small}
            />
          </div>
        ))}
      </div>
      <h3 className="text-sm font-medium">{topic}</h3>
    </div>
  );
};

export default PhotosPreview;
