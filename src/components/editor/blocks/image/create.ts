import type { ImageContentBlock } from './schema';

export const ImageBlockCreate = (): ImageContentBlock => ({
  id: crypto.randomUUID(),
  type: 'image',
  attributes: {
    url: {
      type: 'plain-text',
      value: '',
    },
    altText: {
      type: 'plain-text',
      value: '',
    },
    caption: {
      type: 'plain-text',
      value: '',
    },
    size: {
      type: 'plain-text',
      value: 'original',
    },
    aspect: {
      type: 'plain-text',
      value: 'original',
    },
    width: {
      type: 'plain-text',
      value: 'standard',
    },
    align: {
      type: 'plain-text',
      value: 'left',
    },
  },
});
