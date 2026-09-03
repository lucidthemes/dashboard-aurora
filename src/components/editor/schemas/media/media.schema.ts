import { z } from 'zod';

import { MediaSchema } from '@/schemas/media.schema';

const EditorMediaItemSchema = MediaSchema.omit({ type: true, created_at: true });

export const EditorMediaSchema = z.object({
  items: z.array(EditorMediaItemSchema),
  hasMore: z.boolean(),
});

export type EditorMedia = z.infer<typeof EditorMediaSchema>;

export type EditorMediaItem = z.infer<typeof EditorMediaItemSchema>;
