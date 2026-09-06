import type { SidebarsFormWidgetPromoBox } from '../../../../schemas/form/widgets/promoBox.schema';

export const SidebarsFormWidgetPromoBoxCreate = (): SidebarsFormWidgetPromoBox => ({
  id: crypto.randomUUID(),
  type: 'promoBox',
  title: 'Promo box',
});
