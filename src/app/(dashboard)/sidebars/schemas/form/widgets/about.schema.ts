import { z } from 'zod';

import { SidebarsFormWidgetSchema } from './widget.schema';

export const SidebarsFormWidgetAboutSchema = SidebarsFormWidgetSchema.extend({
  type: z.literal('about'),
  backgroundImage: z.string().optional(),
  authorImage: z.string().optional(),
  heading: z.string().optional(),
  content: z.string().optional(),
  link: z.string().optional(),
  social: z.boolean().optional(),
  centered: z.boolean().optional(),
  padding: z.boolean().optional(),
});

export type SidebarsFormWidgetAbout = z.infer<typeof SidebarsFormWidgetAboutSchema>;
