import type { SeparatorContentBlock } from './schema';

export const SeparatorBlockCreate = (): SeparatorContentBlock => ({
  id: crypto.randomUUID(),
  type: 'separator',
  attributes: {
    width: {
      type: 'plain-text',
      value: 'standard',
    },
  },
});
