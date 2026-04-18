import type { GalleryContentBlock, GalleryContentBlockItem } from './schema';

export const GalleryBlockCreate = (): GalleryContentBlock => ({
  id: crypto.randomUUID(),
  type: 'gallery',
  attributes: {
    images: {
      type: 'array',
      items: [],
    },
    columns: {
      type: 'number',
      value: 2,
    },
    width: {
      type: 'plain-text',
      value: 'standard',
    },
  },
});

export const GalleryBlockCreateItem = (): GalleryContentBlockItem => ({
  id: {
    type: 'plain-text',
    value: crypto.randomUUID(),
  },
  url: {
    type: 'plain-text',
    value: '',
  },
  altText: {
    type: 'plain-text',
    value: '',
  },
});
