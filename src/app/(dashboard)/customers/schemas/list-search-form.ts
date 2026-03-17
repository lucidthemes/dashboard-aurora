import { z } from 'zod';

export const CustomerListSearchFormSchema = z.object({
  search: z.union([z.uuid('Please enter a valid ID or email address'), z.email()]),
});

export type CustomerListSearchForm = z.infer<typeof CustomerListSearchFormSchema>;
