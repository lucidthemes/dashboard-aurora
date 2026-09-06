import type { SidebarsFormWidgetTags } from '../../../../schemas/form/widgets/tags.schema';

export const SidebarsFormWidgetTagsCreate = (): SidebarsFormWidgetTags => ({
  id: crypto.randomUUID(),
  type: 'tags',
  title: 'tags',
});
