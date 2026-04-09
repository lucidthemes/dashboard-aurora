import { z } from 'zod';

export const PostsListFilterAuthorSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  slug: z.string(),
});

export type PostsListFilterAuthor = z.infer<typeof PostsListFilterAuthorSchema>;
