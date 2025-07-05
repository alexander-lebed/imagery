import { Photo } from '@/app/types';

export const downloadPhoto = async (photo: Photo) => {
  try {
    const photoName = photo.slug || 'Imagery-photo';
    // Use our API route as a proxy to avoid CORS issues
    const proxyUrl = `/api/download-photo?url=${encodeURIComponent(photo.links.download)}&filename=${encodeURIComponent(photoName)}`;
    const response = await fetch(proxyUrl);
    if (!response.ok) {
      throw new Error(`Download failed: ${response.status}`);
    }
    const blob = await response.blob();
    const downloadLink = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadLink;
    link.download = photoName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadLink);
  } catch (error) {
    console.error('Download failed:', error);
  }
};
