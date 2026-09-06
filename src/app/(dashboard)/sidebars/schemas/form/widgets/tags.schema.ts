import { z } from 'zod';

import { SidebarsFormWidgetSchema } from './widget.schema';

export const SidebarsFormWidgetTagsSchema = SidebarsFormWidgetSchema.extend({
  type: z.literal('tags'),
  limit: z.int().positive().optional(),
});

export type SidebarsFormWidgetTags = z.infer<typeof SidebarsFormWidgetTagsSchema>;
