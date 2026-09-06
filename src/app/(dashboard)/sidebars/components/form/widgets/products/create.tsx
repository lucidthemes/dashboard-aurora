import type { SidebarsFormWidgetProducts } from '../../../../schemas/form/widgets/products.schema';

export const SidebarsFormWidgetProductsCreate = (): SidebarsFormWidgetProducts => ({
  id: crypto.randomUUID(),
  type: 'products',
  title: 'Latest products',
  limit: 3,
  style: 'small',
  location: 'sidebar',
});
