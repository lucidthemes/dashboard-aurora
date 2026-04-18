import type { PullquoteContentBlock } from './schema';

export const PullquoteBlockCreate = (): PullquoteContentBlock => ({
  id: crypto.randomUUID(),
  type: 'pullquote',
  attributes: {
    content: {
      type: 'rich-text',
      value: '',
    },
    cite: {
      type: 'rich-text',
      value: '',
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
