import { z } from 'zod';

export const AccountPasswordFormSchema = z
  .object({
    password: z.string().min(8, 'Password needs to be longer than 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type AccountPasswordForm = z.infer<typeof AccountPasswordFormSchema>;
