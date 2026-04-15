import { z } from 'zod';

export const PagesListSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  status: z.enum(['draft', 'published']),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type PagesList = z.infer<typeof PagesListSchema>;
