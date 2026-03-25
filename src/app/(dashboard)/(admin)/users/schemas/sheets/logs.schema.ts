import { z } from 'zod';

export const UsersViewSheetLogsSchema = z.object({
  log_level: z.string(),
  message: z.string(),
  created_at: z.coerce.date(),
});

export type UsersViewSheetLogs = z.infer<typeof UsersViewSheetLogsSchema>;
