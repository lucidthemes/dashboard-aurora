import { z } from 'zod';

export const PostsListSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  author: z.object({
    name: z.string(),
  }),
  categories: z.array(
    z.object({
      category: z.object({
        id: z.uuid(),
        name: z.string(),
      }),
    }),
  ),
  tags: z.array(
    z.object({
      tag: z.object({
        id: z.uuid(),
        name: z.string(),
      }),
    }),
  ),
  status: z.enum(['draft', 'published']),
  created_at: z.coerce.date(),
});

export type PostsList = z.infer<typeof PostsListSchema>;
