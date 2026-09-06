import { z } from 'zod';

import { SidebarsFormWidgetSchema } from './widget.schema';

export const SidebarsFormWidgetPostsSchema = SidebarsFormWidgetSchema.extend({
  type: z.literal('posts'),
  limit: z.int().positive().optional(),
  style: z.enum(['small', 'wide']).optional(),
  location: z.enum(['sidebar', 'footer']).optional(),
});

export type SidebarsFormWidgetPosts = z.infer<typeof SidebarsFormWidgetPostsSchema>;
