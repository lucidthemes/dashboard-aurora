import { z } from 'zod';

import { SidebarsFormWidgetSchema } from './widget.schema';

export const SidebarsFormWidgetSearchSchema = SidebarsFormWidgetSchema.extend({
  type: z.literal('search'),
});

export type SidebarsFormWidgetSearch = z.infer<typeof SidebarsFormWidgetSearchSchema>;
