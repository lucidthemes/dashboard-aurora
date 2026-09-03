import { z } from 'zod';

export const PostOptionsSchema = z.object({
  header: z.object({
    show: z.boolean(),
    layout: z
      .enum([
        'outside-above',
        'outside-below',
        'split-narrow',
        'split-wide',
        'split-full',
        'overlay-narrow',
        'overlay-wide',
        'overlay-full',
      ])
      .optional(),
    besideSidebar: z.boolean().optional(),
  }),
  sidebar: z.object({
    show: z.boolean(),
    option: z.string().optional(),
    position: z.enum(['left', 'right']).optional(),
  }),
});

export type PostOptions = z.infer<typeof PostOptionsSchema>;
