import { Photo } from '@/app/types';

export const photos: Array<Photo> = Array(3)
  .fill(null)
  .map((_, index) => {
    const photo: Partial<Photo> = {
      id: String(index + 1),
      slug: `slug-${index + 1}`,
      alt_description: `Photo ${index + 1}`,
      urls: {
        regular: `photo${index + 1}.jpg`,
        raw: `photo${index + 1}-raw.jpg`,
        full: `photo${index + 1}-full.jpg`,
        small: `photo${index + 1}-small.jpg`,
        thumb: `photo${index + 1}-thumb.jpg`,
      },
    };
    return photo;
  }) as Array<Photo>;
