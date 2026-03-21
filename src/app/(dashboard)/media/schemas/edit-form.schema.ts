import { z } from 'zod';

export const MediaEditFormSchema = z.object({
  alt_text: z.string().max(125, 'Alt text should be under 125 characters').optional(),
});

export type MediaEditForm = z.infer<typeof MediaEditFormSchema>;
