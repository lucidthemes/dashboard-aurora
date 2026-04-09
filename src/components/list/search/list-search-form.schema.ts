import { z } from 'zod';

export const ListSearchFormSchema = z.object({
  search: z
    .string()
    .transform((val) => val.trim())
    .pipe(z.union([z.uuid('Please enter a valid search term'), z.email(), z.string()])),
});

export type ListSearchForm = z.infer<typeof ListSearchFormSchema>;
