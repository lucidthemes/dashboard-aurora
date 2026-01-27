import { z } from 'zod';

export const MediaSchema = z.object({
  id: z.uuid(),
  type: z.enum(['image', 'video']),
  storage_path: z.string(),
  alt_text: z.string().optional(),
  created_at: z.coerce.date(),
});

export type Media = z.infer<typeof MediaSchema>;

export const MediaEditFormSchema = z.object({
  alt_text: z.string().max(125, 'Alt text should be under 125 characters').optional(),
});
