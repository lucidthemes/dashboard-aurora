import { z } from 'zod';

export const UsersListSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  email_confirmed_at: z.coerce.date().nullable(),
  email_change: z
    .string()
    .transform((val) => (val === '' ? undefined : val))
    .pipe(z.email().optional()),
  email_change_sent_at: z.coerce.date().nullable(),
  recovery_sent_at: z.coerce.date().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  last_sign_in_at: z.coerce.date().nullable(),
  role: z.enum(['customer', 'editor', 'admin']),
});

export type UsersList = z.infer<typeof UsersListSchema>;
