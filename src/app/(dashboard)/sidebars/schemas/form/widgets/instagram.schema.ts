import { z } from 'zod';

import { SidebarsFormWidgetSchema } from './widget.schema';

export const SidebarsFormWidgetInstagramSchema = SidebarsFormWidgetSchema.extend({
  type: z.literal('instagram'),
  feedId: z.uuid().optional(),
});

export type SidebarsFormWidgetInstagram = z.infer<typeof SidebarsFormWidgetInstagramSchema>;
