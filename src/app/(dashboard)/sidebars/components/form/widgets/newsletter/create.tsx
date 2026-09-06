import type { SidebarsFormWidgetNewsletter } from '../../../../schemas/form/widgets/newsletter.schema';

export const SidebarsFormWidgetNewsletterCreate = (): SidebarsFormWidgetNewsletter => ({
  id: crypto.randomUUID(),
  type: 'newsletter',
  title: 'Newsletter',
});
