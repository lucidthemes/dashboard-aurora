import type { SidebarsFormWidgetSearch } from '../../../../schemas/form/widgets/search.schema';

export const SidebarsFormWidgetSearchCreate = (): SidebarsFormWidgetSearch => ({
  id: crypto.randomUUID(),
  type: 'search',
  title: 'Search',
});
