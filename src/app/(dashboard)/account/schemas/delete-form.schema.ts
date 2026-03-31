import { z } from 'zod';

export const AccountDeleteFormSchema = z.object({
  confirm: z
    .string()
    .trim()
    .toUpperCase()
    .refine((val) => val === 'DELETE', {
      message: 'You must type DELETE to confirm',
    }),
});

export type AccountDeleteForm = z.input<typeof AccountDeleteFormSchema>;
