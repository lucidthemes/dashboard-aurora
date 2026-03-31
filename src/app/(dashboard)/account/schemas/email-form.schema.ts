import { z } from 'zod';

export const AccountEmailFormSchema = z.object({
  email: z.email('Please enter a valid email address'),
});

export type AccountEmailForm = z.infer<typeof AccountEmailFormSchema>;
