import { z } from 'zod';

import { SidebarsFormWidgetSchema } from './widget.schema';

export const SidebarsFormWidgetNewsletterSchema = SidebarsFormWidgetSchema.extend({
  type: z.literal('newsletter'),
});

export type SidebarsFormWidgetNewsletter = z.infer<typeof SidebarsFormWidgetNewsletterSchema>;
