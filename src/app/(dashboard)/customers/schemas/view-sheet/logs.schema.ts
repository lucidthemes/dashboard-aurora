import { z } from 'zod';

export const CustomerViewSheetLogsSchema = z.object({
  log_level: z.string(),
  message: z.string(),
  created_at: z.coerce.date(),
});

export type CustomerViewSheetLogs = z.infer<typeof CustomerViewSheetLogsSchema>;
