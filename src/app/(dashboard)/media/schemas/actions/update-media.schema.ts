import { z } from 'zod';

import { MediaEditFormSchema } from '../edit-form.schema';

export const MediaUpdateMediaActionSchema = z.object({
  mediaId: z.uuid(),
  formData: MediaEditFormSchema,
});

export type MediaUpdateMediaAction = z.infer<typeof MediaUpdateMediaActionSchema>;
