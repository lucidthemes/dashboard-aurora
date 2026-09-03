import type { ButtonContentBlock } from './schema';

export const ButtonBlockCreate = (): ButtonContentBlock => ({
  id: crypto.randomUUID(),
  type: 'button',
  attributes: {
    link: {
      type: 'plain-text',
      value: '',
    },
    newTab: {
      type: 'boolean',
      value: false,
    },
    text: {
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
