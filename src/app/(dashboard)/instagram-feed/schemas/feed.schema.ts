import { z } from 'zod';

import { MediaSchema } from '@/schemas/media.schema';

export const InstagramFeedSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1),
  layout: z.object({
    gap: z.number().positive(),
    aspectRatio: z.enum(['square', 'portrait']),
    mobilePosts: z.number().int().positive(),
    tabletPosts: z.number().int().positive(),
    desktopPosts: z.number().int().positive(),
    mobileColumns: z.number().int().positive().max(10),
    tabletColumns: z.number().int().positive().max(10),
    desktopColumns: z.number().int().positive().max(10),
  }),
  button: z.object({
    enabled: z.boolean(),
    link: z.url().optional(),
    text: z.string().optional(),
  }),
  created_at: z.coerce.date(),
});

export type InstagramFeed = z.infer<typeof InstagramFeedSchema>;

export const InstagramFeedMediaSchema = MediaSchema.omit({ type: true, created_at: true });

export type InstagramFeedMedia = z.infer<typeof InstagramFeedMediaSchema>;
