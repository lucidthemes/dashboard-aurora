import type { CodeContentBlock } from './schema';

export const CodeBlockCreate = (): CodeContentBlock => ({
  id: crypto.randomUUID(),
  type: 'code',
  attributes: {
    content: {
      type: 'plain-text',
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
