import { z } from 'zod';

import { SidebarsFormWidgetsSchema } from './form/widgets/widgets.schema';

export const SidebarsListSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  title: z.string(),
  widgets: z.array(SidebarsFormWidgetsSchema).nullable(),
  created_at: z.coerce.date(),
});

export type SidebarsList = z.infer<typeof SidebarsListSchema>;
