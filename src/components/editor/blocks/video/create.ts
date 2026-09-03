import type { VideoContentBlock } from './schema';

export const VideoBlockCreate = (): VideoContentBlock => ({
  id: crypto.randomUUID(),
  type: 'video',
  attributes: {
    url: {
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
