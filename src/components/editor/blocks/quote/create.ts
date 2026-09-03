import type { QuoteContentBlock } from './schema';

export const QuoteBlockCreate = (): QuoteContentBlock => ({
  id: crypto.randomUUID(),
  type: 'quote',
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
