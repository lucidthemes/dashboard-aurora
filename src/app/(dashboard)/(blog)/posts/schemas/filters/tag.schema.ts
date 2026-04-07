import { z } from 'zod';

export const PostsListFilterTagSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  slug: z.string(),
});

export type PostsListFilterTag = z.infer<typeof PostsListFilterTagSchema>;
