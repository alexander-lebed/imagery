import { FC } from 'react';
import Image from 'next/image';
import * as PhotoApi from 'unsplash-js/src/methods/photos/types';

export type PhotoProps = {
  photo: PhotoApi.Basic;
  onClick?: () => void;
};

const Photo: FC<PhotoProps> = ({ photo, onClick }) => {
  // Calculate aspect ratio to maintain proper dimensions
  const aspectRatio = photo.width / photo.height;
  return (
    <div
      className={`relative w-full overflow-hidden rounded-lg ${
        onClick ? 'cursor-pointer transition-all duration-300 hover:shadow-lg' : ''
      }`}
      style={{
        // Set the padding-bottom based on aspect ratio to maintain proportions
        paddingBottom: `${(1 / aspectRatio) * 100}%`,
      }}
      onClick={onClick}
    >
      <Image
        className={`object-cover absolute inset-0 ${
          onClick ? 'transition-transform duration-300 hover:scale-105' : ''
        }`}
        src={photo.urls.regular}
        alt={photo.alt_description || 'Photo'}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};

export default Photo;
