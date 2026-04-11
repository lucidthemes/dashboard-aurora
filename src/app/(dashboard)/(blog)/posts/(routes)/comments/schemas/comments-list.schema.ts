import { z } from 'zod';

export const PostsCommentsListSchema = z.object({
  id: z.uuid(),
  post: z.object({
    name: z.string(),
  }),
  reply_to: z.uuid().nullable(),
  name: z.string(),
  comment: z.string(),
  status: z.enum(['approved', 'pending', 'rejected']),
  created_at: z.coerce.date(),
});

export type PostsCommentsList = z.infer<typeof PostsCommentsListSchema>;
