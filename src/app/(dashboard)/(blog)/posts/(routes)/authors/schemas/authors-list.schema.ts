import { z } from 'zod';

export const PostsAuthorsListSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  created_at: z.coerce.date(),
});

export type PostsAuthorsList = z.infer<typeof PostsAuthorsListSchema>;
