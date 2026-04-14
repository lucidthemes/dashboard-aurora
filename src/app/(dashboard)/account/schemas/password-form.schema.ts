import { z } from 'zod';

export const AccountPasswordFormSchema = z
  .object({
    currentPassword: z.string().min(8, 'Please enter your current password'),
    newPassword: z.string().min(8, 'Your new password needs to be longer than 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type AccountPasswordForm = z.infer<typeof AccountPasswordFormSchema>;
