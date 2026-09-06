import type { SidebarsFormWidgetSocial } from '../../../../schemas/form/widgets/social.schema';

export const SidebarsFormWidgetSocialCreate = (): SidebarsFormWidgetSocial => ({
  id: crypto.randomUUID(),
  type: 'social',
  title: 'Follow me',
});
