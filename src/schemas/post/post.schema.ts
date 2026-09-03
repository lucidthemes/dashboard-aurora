import { z } from 'zod';

import { EditorContentSchema } from '@/components/editor/schemas/content/content.schema';

import { PostOptionsSchema } from './options.schema';

export const PostSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1),
  slug: z
    .string()
    .min(1, 'Please enter a slug')
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: 'Slug can only contain lowercase letters, numbers, and hyphens, and cannot start or end with a hyphen',
    }),
  author_id: z.uuid('Please select an author'),
  media_id: z.uuid('Please select an image'),
  excerpt: z.string().nullable().optional(),
  categories: z.array(z.uuid()).optional(),
  tags: z.array(z.uuid()).optional(),
  related: z.array(z.uuid()).optional(),
  content: EditorContentSchema,
  status: z.enum(['draft', 'published']),
  created_at: z.string(),
  updated_at: z.string(),
  options: PostOptionsSchema.optional().nullable(),
});

export type Post = z.infer<typeof PostSchema>;
