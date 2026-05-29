import { z } from 'zod';

export const PostsAuthorsFormSchema = z.object({
  name: z.string().min(1, 'Please enter a name'),
  slug: z
    .string()
    .min(1, 'Please enter a slug')
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: 'Slug can only contain lowercase letters, numbers, and hyphens, and cannot start or end with a hyphen',
    }),
  description: z.string().optional(),
});

export type PostsAuthorsForm = z.infer<typeof PostsAuthorsFormSchema>;
