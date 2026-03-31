import { z } from 'zod';

export const AccountNameFormSchema = z.object({
  first_name: z.string().min(1, 'Please enter a first name'),
  last_name: z.string().min(1, 'Please enter a last name'),
});

export type AccountNameForm = z.infer<typeof AccountNameFormSchema>;
