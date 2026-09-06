import { z } from 'zod';

export const SidebarsFormSchema = z.object({
  //   id: z.uuid(),
  name: z
    .string()
    .min(1, 'Please enter a name')
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: 'Name can only contain lowercase letters, numbers, and hyphens, and cannot start or end with a hyphen',
    }),
  title: z.string().min(1, 'Please enter a title'),
  //   widgets: z.array(Test).nullable(),
  //   created_at: z.coerce.date(),
});

export type SidebarsForm = z.infer<typeof SidebarsFormSchema>;
