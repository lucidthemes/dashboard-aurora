import { z } from 'zod';

export const LogsListSchema = z.object({
  id: z.uuid(),
  log_level: z.string(),
  event_name: z.string(),
  user_id: z.uuid().nullable(),
  message: z.string().nullable(),
  source: z.string(),
  created_at: z.coerce.date(),
});

export type LogsList = z.infer<typeof LogsListSchema>;
