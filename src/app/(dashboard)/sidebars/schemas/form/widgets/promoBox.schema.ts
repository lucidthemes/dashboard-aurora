import { z } from 'zod';

import { SidebarsFormWidgetSchema } from './widget.schema';

export const SidebarsFormWidgetPromoBoxSchema = SidebarsFormWidgetSchema.extend({
  type: z.literal('promoBox'),
  image: z.string().optional(),
  heading: z.string().optional(),
  subHeading: z.string().optional(),
  link: z.string().optional(),
  position: z.enum(['bottom', 'top', 'center']).optional(),
});

export type SidebarsFormWidgetPromoBox = z.infer<typeof SidebarsFormWidgetPromoBoxSchema>;
