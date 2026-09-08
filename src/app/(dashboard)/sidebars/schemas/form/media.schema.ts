import { z } from 'zod';

import { MediaSchema } from '@/schemas/media.schema';

export const SidebarsFormWidgetMediaItemSchema = MediaSchema.omit({ type: true, created_at: true });

export const SidebarsFormWidgetMediaSchema = z.object({
  items: z.array(SidebarsFormWidgetMediaItemSchema),
  hasMore: z.boolean(),
});

export type SidebarsFormWidgetMedia = z.infer<typeof SidebarsFormWidgetMediaSchema>;

export type SidebarsFormWidgetMediaItem = z.infer<typeof SidebarsFormWidgetMediaItemSchema>;
