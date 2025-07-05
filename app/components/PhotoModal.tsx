import { FC, useState } from 'react';
import Image from 'next/image';
import { Modal } from '@/app/components/ui';
import { Photo } from '@/app/types';

export type PhotoModalProps = {
  isOpen?: boolean;
  onClose: () => void;
  photo: Photo;
};

const PhotoModal: FC<PhotoModalProps> = ({ isOpen = true, onClose, photo }) => {
  const [isLoading, setIsLoading] = useState(true);

  if (!photo) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative max-w-full max-h-full">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            Loading image...
          </div>
        )}

        <Image
          className={`max-w-full max-h-[90vh] object-contain rounded-lg transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          alt={photo.alt_description || 'Photo'}
          src={photo.urls.full || photo.urls.regular}
          width={photo.width}
          height={photo.height}
          priority
          onLoadingComplete={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />

        {photo.alt_description && !isLoading && (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
            <p className="text-sm">{photo.alt_description}</p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PhotoModal;
