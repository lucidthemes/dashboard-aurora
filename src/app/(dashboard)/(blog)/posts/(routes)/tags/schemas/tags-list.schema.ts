import { z } from 'zod';

export const PostsTagsListSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  created_at: z.coerce.date(),
});

export type PostsTagsList = z.infer<typeof PostsTagsListSchema>;
