import * as PhotoApi from 'unsplash-js/src/methods/photos/types';

export const photos: Array<PhotoApi.Basic> = Array(3)
  .fill(null)
  .map((_, index) => {
    const photo: Partial<PhotoApi.Basic> = {
      id: String(index + 1),
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
  }) as Array<PhotoApi.Basic>;
