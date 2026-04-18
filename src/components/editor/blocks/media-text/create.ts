import type { MediaTextContentBlock } from './schema';

export const MediaTextBlockCreate = (): MediaTextContentBlock => ({
  id: crypto.randomUUID(),
  type: 'mediaText',
  attributes: {
    mediaType: {
      type: 'plain-text',
    },
    mediaUrl: {
      type: 'plain-text',
      value: '',
    },
    mediaAltText: {
      type: 'plain-text',
      value: '',
    },
    mediaPosition: {
      type: 'plain-text',
      value: 'left',
    },
    mediaWidth: {
      type: 'number',
      value: 50,
    },
    mediaSize: {
      type: 'plain-text',
      value: 'original',
    },
    mediaAspect: {
      type: 'plain-text',
      value: 'original',
    },
    text: {
      type: 'rich-text',
      value: '',
    },
    textPosition: {
      type: 'plain-text',
      value: 'center',
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
