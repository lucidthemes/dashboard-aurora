import type { SidebarsFormWidgetInstagram } from '../../../../schemas/form/widgets/instagram.schema';

export const SidebarsFormWidgetInstagramCreate = (): SidebarsFormWidgetInstagram => ({
  id: crypto.randomUUID(),
  type: 'instagram',
  title: 'Instagram',
});
