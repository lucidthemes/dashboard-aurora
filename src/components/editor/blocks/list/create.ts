import type { ListContentBlock, ListContentBlockItem } from './schema';

export const ListBlockCreate = (): ListContentBlock => ({
  id: crypto.randomUUID(),
  type: 'list',
  attributes: {
    list: {
      type: 'array',
      items: [
        {
          id: {
            type: 'plain-text',
            value: crypto.randomUUID(),
          },
          content: {
            type: 'rich-text',
            value: '',
          },
        },
      ],
    },
    listStyle: {
      type: 'plain-text',
      value: 'disc',
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

export const ListBlockCreateItem = (): ListContentBlockItem => ({
  id: {
    type: 'plain-text',
    value: crypto.randomUUID(),
  },
  content: {
    type: 'rich-text',
    value: '',
  },
});
