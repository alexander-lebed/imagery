import { FC, MouseEventHandler, useCallback } from 'react';
import Image from 'next/image';
import { Photo as PhotoType } from '@/app/types';
import { downloadPhoto } from '@/app/utils';

export type PhotoProps = {
  photo: PhotoType;
  onClick?: () => void;
};

const Photo: FC<PhotoProps> = ({ photo, onClick }) => {
  // Calculate aspect ratio to maintain proper dimensions
  const aspectRatio = photo.width / photo.height;

  const handleDownload: MouseEventHandler<HTMLButtonElement> = useCallback(
    async e => {
      e.stopPropagation();
      await downloadPhoto(photo);
    },
    [photo]
  );

  return (
    <div
      className={`relative w-full overflow-hidden rounded-lg group ${
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

      {/* Download icon on hover */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <button
          onClick={handleDownload}
          className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2 cursor-pointer transition-colors duration-200"
          title="Download photo"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7,10 12,15 17,10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Photo;
