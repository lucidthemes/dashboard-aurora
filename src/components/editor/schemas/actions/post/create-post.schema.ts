import { z } from 'zod';

import { PostSchema } from '@/schemas/post/post.schema';

export const EditorCreatePostSchema = PostSchema.omit({ id: true, created_at: true, updated_at: true });

export type EditorCreatePost = z.infer<typeof EditorCreatePostSchema>;
