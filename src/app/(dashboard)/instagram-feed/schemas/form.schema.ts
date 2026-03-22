import { z } from 'zod';

import { InstagramFeedSchema } from './feed.schema';
import { InstagramFeedMediaSchema } from './feed.schema';

// used for feed form inputs. based on instagram feed schema. omits unnecessary fields
// checks if button checkbox is ticked. shows error messages if ticked
export const InstagramFeedFormSchema = InstagramFeedSchema.omit({ id: true, created_at: true })
  .extend({
    name: InstagramFeedSchema.shape.name.refine((val) => val !== 'New feed', {
      message: 'Please change the name from the default',
    }),
  })
  .superRefine((data, ctx) => {
    if (data.button.enabled) {
      if (!data.button.text) {
        ctx.addIssue({
          code: 'custom',
          message: 'Button text is required',
          path: ['button', 'text'],
        });
      }

      if (!data.button.link) {
        ctx.addIssue({
          code: 'custom',
          message: 'Button link is required',
          path: ['button', 'link'],
        });
      }
    }
  });

export type InstagramFeedForm = z.infer<typeof InstagramFeedFormSchema>;

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
