import { z } from 'zod';

export const UserEditSheetFormSchema = z.object({
  role: z.enum(['customer', 'editor', 'admin']),
});

export type UsersEditSheetForm = z.infer<typeof UserEditSheetFormSchema>;
