import { z } from 'zod';

import { SidebarsFormWidgetSchema } from './widget.schema';

export const SidebarsFormWidgetProductsSchema = SidebarsFormWidgetSchema.extend({
  type: z.literal('products'),
  limit: z.int().positive().optional(),
  style: z.enum(['small', 'wide']).optional(),
  location: z.enum(['sidebar', 'footer']).optional(),
});

export type SidebarsFormWidgetProducts = z.infer<typeof SidebarsFormWidgetProductsSchema>;
