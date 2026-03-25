import { z } from 'zod';

export const UsersCreateSheetFormSchema = z.object({
  email: z.email('Please enter a valid email address'),
});

export type UsersCreateSheetForm = z.infer<typeof UsersCreateSheetFormSchema>;
