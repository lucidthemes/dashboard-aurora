import { z } from 'zod';

import { PostSchema } from '@/schemas/post/post.schema';

export const NewPostSchema = PostSchema.extend({
  id: z.uuid().nullable(),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
});

export type NewPost = z.infer<typeof NewPostSchema>;
