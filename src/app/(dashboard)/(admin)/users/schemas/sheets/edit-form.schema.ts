import { z } from 'zod';

export const UsersEditSheetFormSchema = z.object({
  role: z.enum(['customer', 'editor', 'admin']),
});

export type UsersEditSheetForm = z.infer<typeof UsersEditSheetFormSchema>;
