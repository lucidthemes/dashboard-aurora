import { z } from 'zod';

import { PageSchema } from '@/schemas/page/page.schema';

export const NewPageSchema = PageSchema.extend({
  id: z.uuid().nullable(),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
});

export type NewPage = z.infer<typeof NewPageSchema>;
