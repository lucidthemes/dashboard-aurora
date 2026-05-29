import { z } from 'zod';

export const PostsCategoriesListSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  created_at: z.coerce.date(),
});

export type PostsCategoriesList = z.infer<typeof PostsCategoriesListSchema>;
