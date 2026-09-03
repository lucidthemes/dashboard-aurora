import { z } from 'zod';

import { EditorContentSchema } from '@/components/editor/schemas/content/content.schema';

import { PageOptionsSchema } from './options.schema';

export const PageSchema = z.object({
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
  content: EditorContentSchema,
  status: z.enum(['draft', 'published']),
  created_at: z.string(),
  updated_at: z.string(),
  options: PageOptionsSchema.optional().nullable(),
});

export type Page = z.infer<typeof PageSchema>;
