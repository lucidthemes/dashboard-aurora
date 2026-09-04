import { z } from 'zod';

export const PageOptionsSchema = z.object({
  sidebar: z.object({
    show: z.boolean(),
    option: z.string().optional(),
    position: z.enum(['left', 'right']).optional(),
  }),
});

export type PageOptions = z.infer<typeof PageOptionsSchema>;
