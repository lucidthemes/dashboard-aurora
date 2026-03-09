import { z } from 'zod';

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

export const InstagramFeedMediaSchema = z.object({
  id: z.uuid(),
  storage_path: z.string(),
  alt_text: z.string().optional().nullable(),
});

export type InstagramFeedMedia = z.infer<typeof InstagramFeedMediaSchema>;

// used for feed form selected images
export const InstagramFeedFormImagesSchema = z.object({
  media: InstagramFeedMediaSchema,
  position: z.number().int().positive(),
});

export type InstagramFeedFormImages = z.infer<typeof InstagramFeedFormImagesSchema>;

// used for feed form media popup
export const InstagramFeedFormMediaSchema = z.object({
  items: z.array(InstagramFeedMediaSchema),
  hasMore: z.boolean(),
});

export type InstagramFeedFormMedia = z.infer<typeof InstagramFeedFormMediaSchema>;

// used for feed form inputs
export const InstagramFeedFormSchema = InstagramFeedSchema.omit({ id: true, created_at: true }).extend({
  name: InstagramFeedSchema.shape.name.refine((val) => val !== 'New feed', {
    message: 'Please change the name from the default',
  }),
});

export type InstagramFeedForm = z.infer<typeof InstagramFeedFormSchema>;
