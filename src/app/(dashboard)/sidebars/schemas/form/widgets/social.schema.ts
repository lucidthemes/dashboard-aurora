import { z } from 'zod';

import { SidebarsFormWidgetSchema } from './widget.schema';

export const SidebarsFormWidgetSocialSchema = SidebarsFormWidgetSchema.extend({
  type: z.literal('social'),
});

export type SidebarsFormWidgetSocial = z.infer<typeof SidebarsFormWidgetSocialSchema>;
