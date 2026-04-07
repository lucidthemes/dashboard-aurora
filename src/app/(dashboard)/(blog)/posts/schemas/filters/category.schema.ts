import { z } from 'zod';

export const PostsListFilterCategorySchema = z.object({
  id: z.uuid(),
  name: z.string(),
  slug: z.string(),
});

export type PostsListFilterCategory = z.infer<typeof PostsListFilterCategorySchema>;
