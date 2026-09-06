import type { SidebarsFormWidgetAbout } from '../../../../schemas/form/widgets/about.schema';

export const SidebarsFormWidgetAboutCreate = (): SidebarsFormWidgetAbout => ({
  id: crypto.randomUUID(),
  type: 'about',
  title: 'About me',
});
