import type { HeadingContentBlock } from './schema';

export const HeadingBlockCreate = (): HeadingContentBlock => ({
  id: crypto.randomUUID(),
  type: 'heading',
  attributes: {
    content: {
      type: 'rich-text',
      value: '',
    },
    level: {
      type: 'number',
      value: 2,
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
