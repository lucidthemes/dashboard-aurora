import type { ParagraphContentBlock } from './schema';

export const ParagraphBlockCreate = (): ParagraphContentBlock => ({
  id: crypto.randomUUID(),
  type: 'paragraph',
  attributes: {
    content: {
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
