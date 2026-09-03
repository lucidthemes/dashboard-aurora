import { z } from 'zod';

import { PostSchema } from '@/schemas/post/post.schema';

export const EditorUpdatePostSchema = PostSchema.omit({ created_at: true, updated_at: true });

export type EditorUpdatePost = z.infer<typeof EditorUpdatePostSchema>;
