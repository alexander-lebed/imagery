import { FC, useState, useCallback, MouseEventHandler } from 'react';
import Image from 'next/image';
import { Photo } from '@/app/types';
import { Modal } from '@/app/ui';
import { downloadPhoto } from '@/app/utils';

export type PhotoModalProps = {
  isOpen?: boolean;
  onClose: () => void;
  photo: Photo;
};

const PhotoModal: FC<PhotoModalProps> = ({ isOpen = true, onClose, photo }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleDownload: MouseEventHandler<HTMLButtonElement> = useCallback(
    async e => {
      e.stopPropagation();
      await downloadPhoto(photo);
    },
    [photo]
  );

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

        {!isLoading && (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white py-4 rounded-b-lg">
            <div className="flex items-center gap-4">
              <button
                onClick={handleDownload}
                className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 cursor-pointer transition-colors duration-200 flex-shrink-0"
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
              <p className="text-sm flex-1">{photo.alt_description || 'Photo'}</p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PhotoModal;
